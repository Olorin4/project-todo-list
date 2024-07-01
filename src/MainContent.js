import TabSwitcher from './TabSwitcher';

const taskListsData = [
    { id: 'tab-1', tasks: [
        { title: 'Task 1A', description: 'Description for Task 1A' },
        { title: 'Task 1B', description: 'Description for Task 1B' }
    ]},
    { id: 'tab-2', tasks: [
        { title: 'Task 2A', description: 'Description for Task 2A' },
        { title: 'Task 2B', description: 'Description for Task 2B' }
    ]},
    { id: 'tab-3', tasks: [
        { title: 'Task 3A', description: 'Description for Task 3A' },
        { title: 'Task 3B', description: 'Description for Task 3B' }
    ]}
];

function loadTasks() {
    const tabSwitcher = new TabSwitcher();

    taskListsData.forEach(list => {
        const taskList = document.getElementById(list.id);
        list.tasks.forEach(task => {
            const taskElement = createTaskElement(task.title, task.description);
            taskList.appendChild(taskElement);
        });
    });

    document.getElementById('tab-1').style.display = 'block'; // Show the first tab by default
}

function createTaskElement(title, description) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    
    const taskTitle = document.createElement('h4');
    taskTitle.textContent = title;
    taskElement.appendChild(taskTitle);
    
    const taskDescription = document.createElement('p');
    taskDescription.textContent = description;
    taskElement.appendChild(taskDescription);
    
    return taskElement;
}


export { loadTasks };