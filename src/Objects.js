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
        // After removing, update the IDs of remaining projects
        this.projects.forEach((project, index) => {
            project.id = index + 1;
        });
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
        // After removing, update the IDs of remaining tasks
        this.taskList.forEach((task, index) => {
            task.id = index + 1;
        });
    }

    getTaskById(id) {
        return this.taskList.find(task => task.id === id);
    }
}


class Task {
    constructor(taskId, description, projectId, dueDate = null) {
        this.id = taskId;
        this.description = description;
        this.projectId = projectId;
        this.dueDate = dueDate; 
        this.isCompleted = false;
        this.isImportant = false;
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
}


export { projectList, Project, Task };