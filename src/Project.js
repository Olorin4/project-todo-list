// Project.js establishes basic objects.

class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.completed = false; // Default state is incomplete
    }

    complete() {
        this.completed = true;
    }

    incomplete() {
        this.completed = false;
    }
}

export { Project };