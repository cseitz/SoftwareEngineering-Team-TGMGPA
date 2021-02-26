
let previousDeletion;

var Archives = {
  create(task) {
    previousDeletion = task.data;
    console.log('TASK WAS DELETED', task.data);
  },
  undoDelete() {
    if (previousDeletion) {
      let task = new Task(previousDeletion);
      previousDeletion = false;
      TaskList.create(task);
    }
  }
}
