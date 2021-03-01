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
})

const registerServiceWorker = async () => {
    console.log("Service worker registration called");
    const swRegistration = await navigator.serviceWorker.register('/js/worker/push-notifications.js');

    console.log(swRegistration);
    return swRegistration;
}

const createNotification = async (task) => {
    const reg = await navigator.serviceWorker.getRegistration('/js/worker/push-notifications.js');

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
            const timeNow = moment().valueOf();

            const timeDue = moment(task.date).valueOf();

            const timeNotify = task.notify.split('-')[0];
            console.log("Time notify", timeNotify);

            // Now to calculate the time selected to notify
            const letter = timeNotify[timeNotify.length - 1];
            const multiplier = (letter === 'm') ? 60000 : 3600000 // If minute, 6000 milliseconds, if hour 3600000
            const number = timeNotify.substr(0, timeNotify.length - 1);

            let delay = timeDue - timeNow - (number * multiplier);

            new Promise((resolve, reject) => {
                setTimeout(() => {
                    reg.showNotification(
                        task.name,
                        {
                            body: task.description, // Description of the task as the body
                            actions: [
                                { action: 'open_app', title: 'Go to Taskbook'}
                            ]
                        }
                    );
                    resolve(1)
                }, 5000);
            }).then((val) => {
                    if (val === 1) {
                        console.log("Notification shown.");
                    }
                }
            );
        }
    });
}