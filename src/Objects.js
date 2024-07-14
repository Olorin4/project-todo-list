// Objects.js establishes main objects.

class ProjectList {
    constructor() {
        this.projects = [];    // Array to hold Project instances
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(id) {
        this.projects = this.projects.filter(project => project.id !== id);
    }

    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    }
}


class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.isCurrent = false;
        this.taskList = [];    // Array to hold Task instances
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

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
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


export { ProjectList, Project, Task };