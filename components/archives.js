
let previousDeletion;

const DAY = 24 * 60 * 60 * 1000;
const MONTH = 30 * DAY;
var Archives = {
  get archive() {
    let data = localStorage.getItem('archive_data');
    if (data) {
      let OneMonthOld = Date.now() - MONTH;
      return JSON.parse(data).filter(o => o.deleted_at > OneMonthOld);
    } else {
      return [];
    }
  },
  set archive(task) {
    let OneMonthOld = Date.now() - MONTH;
    localStorage.setItem('archive_data', JSON.stringify([...this.archive, task].filter(o => o.deleted_at > OneMonthOld)));
  },
  create(task) {
    previousDeletion = task.data;
    console.log('TASK WAS DELETED', task.data);
    this.archive = {
      ...task.data,
      deleted_at: Date.now(),
    }
  },
  undoDelete() {
    if (previousDeletion) {
      let task = new Task(previousDeletion);
      previousDeletion = false;
      TaskList.create(task);
    }
  },
  completed(days = 7) {
    let TimeRange = Date.now() - (DAY * days);
    return this.archive.filter(o => o.deleted_at > TimeRange).filter(o => o.completed).length;
  },
}
