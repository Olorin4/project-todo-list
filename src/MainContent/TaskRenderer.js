// TaskRenderer.js handles UI logic of the TaskCard,
// which includes several icons and html elements.
import { projectList } from "../Dashboard/ProjectManager";
import { setCurrentTask, createTask } from "./TaskManager";
import { renderTaskIcons } from './TaskIconRenderer';
import { renderCurrentTask } from "../SideBar/SidebarRenderer";
    

function renderCurrentProject() {
    const currentProject = projectList.currentProject;
    const currentProjectTitle = document.querySelector(".current-project h2");
    if (currentProject) {
        currentProjectTitle.textContent = currentProject.title;
        renderTasks(currentProject);
        renderCurrentTask();
    } else {
        currentProjectTitle.textContent = "";
        console.error("No current project found.");
    }
}


function renderTasks(currentProject) {
    const taskListContainer = document.querySelector(".task-list-container");
    taskListContainer.innerHTML = "";

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
        setupTaskCardProperties(taskCard, task.id);
    });
}


function setupTaskCardProperties(taskCard, id) {
    taskCard.addEventListener('click', () => {
        setCurrentTask(id);
        renderCurrentTask();
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
                renderTasks(currentProject);
                taskTitleInput.value = '';
            }
        }
    });
}


function setupInputProperties(id, taskTitle) {
    taskTitle.addEventListener('click', () => {
        taskTitle.blur();
    });

    taskTitle.addEventListener('dblclick', () => {
        taskTitle.readOnly = false;
        taskTitle.classList.add('editable');
        taskTitle.focus();
    });

    taskTitle.addEventListener('blur', () => {
        taskTitle.classList.remove('editable');
        taskTitle.readOnly = true;
        // renameTask(id, taskTitle.value);
    });

    taskTitle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            taskTitle.classList.remove('editable');
            taskTitle.readOnly = true;
            taskTitle.blur();
        }
    });
}


export { renderCurrentProject, renderTasks, setupAddTask };