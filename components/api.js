

let local = {
  tasks: {
    async update(task) {
      console.log('UPDATING LOCAL TASK', task);
    },
    async create(data) {
      console.log('CREATING LOCAL TASK', data);
    },
    async delete(data) {
      console.log('CREATING LOCAL TASK', data);
    },
    async get() {
      console.log('FETCHING LOCAL TASKS');
      return {
        tasks: [],
      }
    },
  },
  get task() { // alias
    return this.tasks;
  }
}

var API = {
  get offline() {
    // if we are logged in, return false
    // otherwise, return true
    // can test by adding ?offline to the url. example: localhost:8080/?offline
    return new URLSearchParams(location.search).get('offline') !== null;
  },
  tasks: {
    update(task) {
      if (API.offline) {
        return local.tasks.update(task);
      }
      return fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': "application/json; charset=utf-8",
        },
        body: JSON.stringify(task.data),
      })
    },
    create(data) {
      if (API.offline) {
        return local.tasks.create(data);
      }
      return fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
      })
    },
    delete(task) {
      if (API.offline) {
        return local.tasks.delete(task);
      }
      return fetch('/api/tasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': "application/json; charset=utf-8",
        },
        body: JSON.stringify({ id: task.data.id, }),
      })
    },
    get() {
      if (API.offline) {
        return local.tasks.get();
      }
      return fetch('/api/tasks').then(res => res.json());
    }
  },
  get task() { // alias
    return this.tasks;
  }
}
