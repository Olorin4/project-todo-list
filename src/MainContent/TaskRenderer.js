// TaskTaskRenderer.js handles UI logic of the TaskCard,
// which includes several icons and html elements.
import starImg from '../assets/star-plus-outline.svg';
import starImgYellow from '../assets/star-plus-outline-yellow.svg';
import completedImg from "../assets/completed.svg";
import notCompletedImg from "../assets/not-completed.svg";
import calendarImg from "../assets/calendar-black.svg";
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { createTask, removeTask, toggleCompletedStatus, toggleImportantStatus,
        setTaskDueDate, logTaskList } from "./TaskManager";
    

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
        logTaskList();
    });
}


function renderTasks() {
    const taskListContainer = document.querySelector(".task-list-container");
    taskListContainer.innerHTML = ""; // Clear any existing tasks

    const currentProject = projectList.currentProject;

    currentProject.tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.id = task.id;
        taskListContainer.appendChild(taskCard);

        const taskTitle = document.createElement("input");
        taskTitle.value = task.title;
        taskTitle.contentEditable = true;
        taskCard.appendChild(taskTitle);
        setupInputProperties(task.id, taskTitle);
        
        renderTaskLinks(taskCard);
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

function renderTaskLinks(taskCard) {
    const linksContainer = document.createElement("div");
    linksContainer.classList.add("task-links-container");
    linksContainer.id = taskCard.id;
    taskCard.appendChild(linksContainer);

    const completedLink = document.createElement("img");
    completedLink.classList.add("task-links");
    completedLink.id = "link-1";
    completedLink.src = notCompletedImg;
    completedLink.alt = "Mark as completed";
    completedLink.title = "Mark as completed";
    linksContainer.appendChild(completedLink);
    setupCompletedLink();

    const importantLink = document.createElement("img");
    importantLink.classList.add("task-links");
    importantLink.id = "link-2";
    importantLink.src = starImg;
    importantLink.alt = "Mark as important";
    importantLink.title = "Mark as important";
    linksContainer.appendChild(importantLink);
    setupImportantLink();

    const dateLink = document.createElement("img");
    dateLink.classList.add("task-links");
    dateLink.id = "link-3";
    dateLink.src = calendarImg;
    dateLink.alt = "Set due date";
    dateLink.title = "Set due date";
    linksContainer.appendChild(dateLink);
    setupDueDateLink();
}


function setupCompletedLink() {
    const completedLink = document.getElementById("link-1");
    completedLink.addEventListener("click", event => {
        const taskId = parseInt(completedLink.parentElement.id);
        const taskCard = event.target.closest(".task-card");
        const taskTitle = taskCard.querySelector('.task-title');
        const task = projectList.currentProject.getTaskById(taskId);
        
        toggleCompletedStatus(taskId);

        if (task.isCompleted) {
            taskCard.classList.add("completed-task");
            completedLink.src = completedImg;
            completedLink.title = "Mark as not completed";
        } else {
            taskCard.classList.remove("completed-task");
            completedLink.src = notCompletedImg;
            completedLink.title = "Mark as completed";
        }

        // addToCompleted();
        logTaskList();
    })
}


function setupImportantLink() {
    const importantLink = document.getElementById("link-2");
    importantLink.addEventListener("click", event => {
        const taskId = parseInt(importantLink.parentElement.id);
        const task = projectList.currentProject.getTaskById(taskId);

        toggleImportantStatus(taskId);

        if (task.isImportant) {
            importantLink.classList.add("important-task");
            importantLink.src = starImgYellow;
            importantLink.title = "Mark as not important";
        } else {
            importantLink.classList.remove("important-task");
            importantLink.src = starImg;
            importantLink.title = "Mark as important";
        }
        
        // addToImportant();
        logTaskList();
    });
}

function setupDueDateLink() {
    
}


function disableLinks() {

}


export { setupAddTask, renderTasks };