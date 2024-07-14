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

const projectList = new ProjectList();


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
        this.taskList = this.taskList.filter(task => task.id !== id);
    }

    getTaskById(id) {
        return this.taskList.find(task => task.id === id);
    }
}


class Task {
    constructor(taskId, title, projectId) {
        this.id = `${projectId}${taskId}`;
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


export { projectList, Project, Task };