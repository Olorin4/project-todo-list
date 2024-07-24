// TaskLinkRenderer.js handles UI logic of all links inside the Task Card.
import { format, parseISO, isValid } from "date-fns";
import starImg from '../assets/star-plus-outline.svg';
import starImgYellow from '../assets/star-plus-outline-yellow.svg';
import completedImg from "../assets/completed.svg";
import notCompletedImg from "../assets/not-completed.svg";
import calendarImg from "../assets/calendar-black.svg";
import { projectList } from "../Dashboard/ProjectManager";
import { createTask, removeTask, toggleCompletedStatus, toggleImportantStatus,
        setTaskDueDate, logTaskList } from "./TaskManager";
import { renderTasks } from "./TaskRenderer";
import { save } from "../Dashboard/ProjectSaver";


export function renderTaskIcons(taskCard) {
    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("task-icons-container");
    taskCard.appendChild(iconsContainer);

    const taskId = parseInt(iconsContainer.parentElement.dataset.taskId);

    renderCompletedIcon(iconsContainer, taskId);
    renderImportantIcon(iconsContainer, taskId);
    renderDueDateIcon(iconsContainer, taskId);
}


function renderCompletedIcon(iconsContainer, taskId) {
    const completedIcon = document.createElement("img");
    completedIcon.classList.add("task-icons");
    completedIcon.id = "link-2";
    completedIcon.src = notCompletedImg;
    completedIcon.alt = "Mark as completed";
    completedIcon.title = "Mark as completed";
    iconsContainer.appendChild(completedIcon);
    setupCompletedIcon(completedIcon, taskId);
}

function setupCompletedIcon(completedIcon, taskId) {
    completedIcon.addEventListener("click", event => {
        const task = projectList.currentProject.getTaskById(taskId);
        toggleCompletedStatus(taskId);
        removeTask(taskId, projectList.currentProject.id);
        
        if (task.isCompleted) {
            // addToCompleted();
            completedIcon.src = completedImg;
            completedIcon.title = "Mark as not completed";
        } else {
            // createTask(taskId, taskTitle);
            completedIcon.src = notCompletedImg;
            completedIcon.title = "Mark as completed";
        }

        renderTasks();
        logTaskList();
    })
}


function renderImportantIcon(iconsContainer, taskId) {
    const importantIcon = document.createElement("img");
    const task = projectList.currentProject.getTaskById(taskId);
    importantIcon.classList.add("task-icons");
    importantIcon.id = "link-3";
    importantIcon.src = task.isImportant ? starImgYellow : starImg;
    importantIcon.alt = task.isImportant ? "Mark as not important" : "Mark as important";
    importantIcon.title = task.isImportant ? "Mark as not important" : "Mark as important";
    iconsContainer.appendChild(importantIcon);
    setupImportantIcon(importantIcon, taskId);
}

function setupImportantIcon(importantIcon, taskId) {
    importantIcon.addEventListener("click", event => {
        const task = projectList.currentProject.getTaskById(taskId);

        toggleImportantStatus(taskId);

        if (task.isImportant) {
            // addToImportant()
            importantIcon.classList.add("important-task");
            importantIcon.src = starImgYellow;
            importantIcon.title = "Mark as not important";
        } else {
            importantIcon.classList.remove("important-task");
            importantIcon.src = starImg;
            importantIcon.title = "Mark as important";
        }
        // save();
        logTaskList();
    });
}


function renderDueDateIcon(iconsContainer) {
    const dateIcon = document.createElement("img");
    dateIcon.classList.add("task-icons");
    dateIcon.id = "link-4";
    dateIcon.src = calendarImg;
    dateIcon.alt = "Set due date";
    dateIcon.title = "Set due date";
    iconsContainer.appendChild(dateIcon);
    
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = "due-date-input";
    iconsContainer.appendChild(dateInput);
    setupDueDateIcon(dateIcon, dateInput);
}

function setupDueDateIcon(dateIcon, dateInput) {
    dateIcon.addEventListener("click", event => {
        const taskId = parseInt(dateIcon.parentElement.parentElement.dataset.taskId, 10);
        dateInput.style.display = 'block'; // Show the date picker
        dateInput.focus();

        const handleDateInput = () => {
            const parsedDate = parseISO(dateInput.value);
            if (isValid(parsedDate)) {
                // Format the valid date
                const formattedDate = format(parsedDate, 'yyyy-MM-dd');
                setTaskDueDate(taskId, formattedDate);
            } else {
                console.error("Invalid date value");
                // Handle invalid date (e.g., show an error message or reset the input)
                dateInput.value = ''; // Clear the invalid date input
            }
            dateInput.style.display = 'none';
        }

        dateInput.addEventListener('blur', handleDateInput);
        dateInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                handleDateInput();
            }
        });
    });    
}