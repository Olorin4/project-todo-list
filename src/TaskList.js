class TaskList {
    constructor(id, tasks) {
        this.id = id;
        this.tasks = tasks;
        this.listElement = document.getElementById(id);
        this.loadTasks();
    }

    loadTasks() {
        this.tasks.forEach(task => {
            const taskElement = this.createTaskElement(task.title, task.description);
            this.listElement.appendChild(taskElement);
        });
    }

    createTaskElement(title, description) {
        const task = document.createElement('div');
        task.classList.add('task');

        const taskTitle = document.createElement('h4');
        taskTitle.textContent = title;
        task.appendChild(taskTitle);

        const taskDescription = document.createElement('p');
        taskDescription.textContent = description;
        task.appendChild(taskDescription);

        return task;
    }
}

export default TaskList;