// Objects.js establishes main classes.

class ProjectList {
    constructor() {
        this.projects = [];    // Array to hold Project instances
        this.projectCount = this.projects.length;
    }

    addProject(project) {
        this.projects.push(project);
        this.projectCount++;
    }
    removeProject(id) {
        this.projects = this.projects.filter(project => project.id !== id);
        // After removing, update the IDs of remaining projects
        this.projects.forEach((project, index) => {
            project.id = index + 1;
        });
        this.projectCount--;
    }

    get currentProject() {
        return this.projects.find(project => project._isCurrent);
    }

    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    }
}


class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this._isCurrent = false;
        this.tasks = [];    // Array to hold Task instances
        this.taskCount = this.tasks.length;
    }

    get isCurrent() {
        return this._isCurrent;
    }
    set isCurrent(value) {
        this._isCurrent = value;
    }
    
    addTask(task) {
        this.tasks.push(task);
        this.taskCount++;
    }
    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        // After removing, update the IDs of remaining tasks
        this.tasks.forEach((task, index) => {
            task.id = index + 1;
        });
        this.taskCount--;
    }

    get currentTask() {
        return this.tasks.find(task => task._isCurrent);
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }
}


class Task {
    constructor(id, title, projectId) {
        this.id = id;
        this.title = title;
        this.projectId = projectId;
        this._isCompleted = false;
        this._isImportant = false;
        this.dueDate = undefined; 
        this._isCurrent = false;
        this.notes = "";
        this.subtasks = [];
        this.subtasksCount = this.subtasks.length;
    }

    get isCurrent() {
        return this._isCurrent;
    }
    set isCurrent(value) {
        this._isCurrent = value;
    }

    get isCompleted() {
        return this._isCompleted;
    }
    set isCompleted(value) {
        this._isCompleted = value;
    }

    get isImportant() {
        return this._isImportant;
    }
    set isImportant(value) {
        this._isImportant = value;
    }

    getDueDate() {
        return this.dueDate;
    }
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    addSubtask(subtask) {
        this.subtasks.push(subtask);
        this.subtasksCount++;
    }
    removeSubtask(id) {
        this.subtasks = this.subtasks.filter(subtask => subtask.id !== id);
        // After removing, update the IDs of remaining subtasks
        this.subtasks.forEach((subtask, index) => {
            subtask.id = index + 1;
        });
        this.subtasksCount--;
    }

    getSubtaskById(id) {
        return this.subtasks.find(subtask => subtask.id === id);
    }
}


class Subtask {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this._isCompleted = false;
    }

    get isCompleted() {
        return this._isCompleted;
    }
    set isCompleted(value) {
        this._isCompleted = value;
    }
}


export { ProjectList, Project, Task, Subtask };