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
    constructor(taskId, title, projectId, dueDate = null) {
        this.id = taskId;
        this.title = title;
        this.isCompleted = false;
        this.isImportant = false;
        this.dueDate = dueDate; 
        this.projectId = projectId;
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

    getDueDate() {
        return this.dueDate;
    }
    setDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }
}


export { projectList, Project, Task };