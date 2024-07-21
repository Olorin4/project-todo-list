// TaskTaskRenderer.js handles UI logic of the TaskCard,
// which includes several icons and html elements.
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { renderTaskIcons } from './TaskIconRenderer';
import { createTask, removeTask } from "./TaskManager";
    

function renderTasks() {
    const taskListContainer = document.querySelector(".task-list-container");
    taskListContainer.innerHTML = ""; // Clear any existing tasks

    const currentProject = projectList.currentProject;

    currentProject.tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.dataset.taskId = task.id;
        taskListContainer.appendChild(taskCard);
        
        const taskTitle = document.createElement("input");
        taskTitle.value = task.title;
        taskCard.appendChild(taskTitle);
        setupInputProperties(task.id, taskTitle);
        
        renderTaskIcons(taskCard);
    });
}


function setupAddTask() {
    const taskTitleInput = document.querySelector(".task-title");

    if (!taskTitleInput) {
        console.error("Task input field not found.");
        return;
    }

    taskTitleInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const newTaskTitle = taskTitleInput.value.trim();

            if (newTaskTitle) {
                const currentProject = projectList.currentProject;
                const newTaskId = currentProject.taskCount + 1;
                
                createTask(newTaskId, newTaskTitle);

                renderTasks(); // Re-render the tasks to include the new task
                
                taskTitleInput.value = ''; // Clear the input field
            }
        }
    });
}


function setupInputProperties(id, taskTitle) {
    // Set up event listener for switching tabs:
    taskTitle.addEventListener('click', () => {
        taskTitle.blur();
    });

    // Event listener for double-click to make input editable:
    taskTitle.addEventListener('dblclick', () => {
        taskTitle.readOnly = false;
        taskTitle.classList.add('editable');
        taskTitle.focus(); // Focus the input field for immediate editing
    });

    // Event listener for blur to make input read-only again:
    taskTitle.addEventListener('blur', () => {
        taskTitle.classList.remove('editable');
        taskTitle.readOnly = true;
        // renameTask(id, taskTitle.value);
    });

    // Event listener for enter key to make input read-only again:
    taskTitle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            taskTitle.classList.remove('editable');
            taskTitle.readOnly = true;
            taskTitle.blur();
        }
    });
}


export { renderTasks, setupAddTask };