// Project.js establishes main objects.

class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

class Task {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.completed = false;
        this.important = false;
    }

    complete() {
        this.completed = true;
    }
    incomplete() {
        this.completed = false;
    }

    important() {
        this.important = true;
    }
    unimportant() {
        this.important = false;
    }
}

const projects = {}; // Centralized storage for projects

export { Project, Task, projects };