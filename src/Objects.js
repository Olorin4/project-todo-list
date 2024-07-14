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


class TaskCard {
    constructor(task) {
        this.task = task;
        this.element = this.createTaskCardElement();
    }

    createTaskCardElement() {
        const card = document.createElement('div');
        card.classList.add('task-card');

        const title = document.createElement('h3');
        title.textContent = this.task.title;
        card.appendChild(title);

        const importantIcon = this.createIcon('important', () => this.toggleImportant());
        card.appendChild(importantIcon);

        const completeIcon = this.createIcon('complete', () => this.toggleComplete());
        card.appendChild(completeIcon);

        const dueDateIcon = this.createIcon('due-date', () => this.setDueDate());
        card.appendChild(dueDateIcon);

        const deleteIcon = this.createIcon('delete', () => this.deleteTask());
        card.appendChild(deleteIcon);

        return card;
    }

    createIcon(name, onClick) {
        const icon = document.createElement('span');
        icon.classList.add('icon', name);
        icon.addEventListener('click', onClick);
        return icon;
    }

    toggleImportant() {
        this.task.isImportant ? this.task.markUnimportant() : this.task.markImportant();
        this.updateIconState('important', this.task.isImportant);
    }

    toggleComplete() {
        this.task.isCompleted ? this.task.incomplete() : this.task.complete();
        this.updateIconState('complete', this.task.isCompleted);
    }

    setDueDate() {
        const dueDate = prompt("Enter due date:");
        if (dueDate) {
            this.task.setDueDate(dueDate);
        }
    }

    deleteTask() {
        // Implement delete logic here
        this.element.remove();
    }

    updateIconState(iconName, isActive) {
        const icon = this.element.querySelector(`.icon.${iconName}`);
        if (isActive) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    }
}


export { projectList, Project, Task, TaskCard };