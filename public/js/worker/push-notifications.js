// Keep on reading and you will understand why a global list of open promises is needed
let pendingPromises = [];

// This installs the serviceworker. It gets called in footer right before closing body tag
self.addEventListener('install', event => console.log("ServiceWorker installed"));

// This is what I was trying to set up for the serviceworker to call the notification, but without success
self.addEventListener('message', event => {
    console.log('Service worker message received.', event.data);

    const delay = new Date().getTime() + 10000;
    setTimeout((event = event) => {
        const title = "Test";
        const options = {
            body: "Test body"
        }

        event.waitUntil(self.registration.showNotification(title, options))
    }, delay);
});

self.addEventListener('notificationclick', (event) => {
    console.log("Notification click", event.action)

    if (event.action === 'open_app') {
        window.open(window.location.href, '_blank').focus();
    }

    if (event.action === 'close_notification') {
        event.notification.close();
    }
})

const registerServiceWorker = async () => {
    console.log("Service worker registration called");
    const swRegistration = await navigator.serviceWorker.register('/js/worker/push-notifications.js');

    console.log(swRegistration);
    return swRegistration;
}

const clearNotifications = (task) => {
    /*
    Jesus Christ, can't do this like that because it isn't the serviceworker who is polling the notifications
    Note that for now, we are using promises to poll notifications - I know, I know, it is a horrible way to do this
    I really appreciate any tips into how to change that. I am as of now, more than 4 days into this thing and starting
    to question existence at this point.
     */
    // const notifications = await swRegistration.getNotifications({
    //     includeTriggered: true
    // });
    // notifications.forEach(notification => console.log("Notification:", notification));

    // Let's try this:
    for (let i = 0; i < pendingPromises.length; i++) {
        if (pendingPromises[i].task === task) {
            // Remove the old promise
            pendingPromises.splice(i, 1);
        }
    }
}

const createNotification = async (task) => {
    const reg = await navigator.serviceWorker.getRegistration('/js/worker/push-notifications.js');

    // First, clear any notification that might have been created for this
    clearNotifications(task);

    // console.log(reg.active);
    //
    // reg.active.postMessage('please work');

    // then((reg) => {
    //     if (reg === undefined) {
    //         console.log("Not able to get the registration");
    //     } else {
    //         reg.sync.register("send_push").then(() => {
    //             console.log("Sent send_push");
    //         })
    //     }
    // });

    // TODO make this work.
    Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
            alert('you need to allow push notifications');
        } else {
            // The delay for the notification must be calculated
            // This is done using the time the task is due, the time now and how many minutes/hours before the notification should show up
            const timeNow = moment().valueOf();
            const timeDue = moment(task.date).valueOf();
            const timeNotify = task.notify.split('-')[0];

            // Now to actually calculate the time selected to notify
            const letter = timeNotify[timeNotify.length - 1];
            const multiplier = (letter === 'm') ? 60000 : 3600000 // If minute, 6000 milliseconds, if hour 3600000
            const number = timeNotify.substr(0, timeNotify.length - 1);

            let delay = timeDue - timeNow - (number * multiplier);

            // If the time for the due date is set to be lesser than the time of the notification, warn the user.
            if (delay <= 0) {
                // This will be done using another push notification.
                reg.showNotification(
                            "Invalid notification settings",
                            {
                                body: "Please select a due date bigger than the notification time.\n" +
                                    "Task: " + task.name, // Description of the task as the body
                                actions: [
                                    {action: 'close_notification', title: 'Close'}
                                ]
                            }
                        );

            } else {
                const promise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reg.showNotification(
                            task.name,
                            {
                                body: task.description, // Description of the task as the body
                                actions: [
                                    {action: 'open_app', title: 'Go to Taskbook'}
                                ]
                            }
                        );
                        resolve(1)
                    }, delay); // Change this delay value to something shorter, like 5000 for testing
                }).then((val) => {
                        if (val === 1) {
                            console.log("Notification shown.");
                        }

                        // We can afford to clear all notifications associated with this task, as for now it only supports one
                        clearNotifications(task);
                    }
                );

                pendingPromises.push({task: task, promise: promise});
            }
        }
    });
}