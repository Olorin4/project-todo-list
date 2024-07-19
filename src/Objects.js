// Objects.js establishes main objects.

class ProjectList {
    constructor() {
        this.projects = [];    // Array to hold Project instances
        this.projectCount = 0;
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
        this.taskCount = 0;
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
        return this.tasks.find(task => task.isCurrent);
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }
}


class Task {
    constructor(id, title, projectId, dueDate = null) {
        this.id = id;
        this.title = title;
        this.projectId = projectId;
        this.dueDate = dueDate; 
        this.isCurrent = false;
        this.isCompleted = false;
        this.isImportant = false;
        this.notes = "";
        this.subtasks = [];
    }

    setCurrent() {
        this.isCurrent = true;
    }
    unsetCurrent() {
        this.isCurrent = false;
    }

    complete() {
        this.isCompleted = true;
    }
    incomplete() {
        this.isCompleted = false;
    }

    markImportant() {
        this.isImportant = true;
    }
    markUnimportant() {
        this.isImportant = false;
    }

    getDueDate() {
        return this.dueDate;
    }
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    addSubtask(subtask) {
        this.subtasks.push(id);
    }
    removeSubtask(id) {
        this.subtasks = this.subtasks.filter(subtask => subtask.id !== id);
        // After removing, update the IDs of remaining subtasks
        this.subtasks.forEach((subtask, index) => {
            subtask.id = index + 1;
        });
    }

    getSubtaskById(id) {
        return this.subtasks.find(subtask => subtask.id === id);
    }
}


class Subtask {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.isCompleted = false;
    }

    complete() {
        this.isCompleted = true;
    }
    incomplete() {
        this.isCompleted = false;
    }
}


export { ProjectList, Project, Task, Subtask };