// Objects.js establishes main objects.

class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.isCurrent = false;
        this.taskList = [];
    }

    setCurrent() {
        this.isCurrent = true;
    }

    unsetCurrent() {
        this.isCurrent = false;
    }

    addTask(task) {
        this.taskList.push(task);
    }
}


class Task {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.isCompleted = false;
        this.isImportant = false;
    }

    complete() {
        this.isCompleted = true;
    }
    incomplete() {
        this.isCompleted = false;
    }

    important() {
        this.isImportant = true;
    }
    unimportant() {
        this.isImportant = false;
    }
}


const projects = {}; // Centralized storage for projects

export { Project, Task, projects };