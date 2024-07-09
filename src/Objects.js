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
        this.completed = false; // Default state is "incomplete"
    }

    complete() {
        this.completed = true;
    }

    incomplete() {
        this.completed = false;
    }
}

export { Project, Task };