// TaskLinkRenderer.js handles UI logic of all links inside the Task Card.
import { format, parseISO, isValid } from "date-fns";
import starImg from '../assets/star-plus-outline.svg';
import starImgYellow from '../assets/star-plus-outline-yellow.svg';
import completedImg from "../assets/completed.svg";
import notCompletedImg from "../assets/not-completed.svg";
import calendarImg from "../assets/calendar-black.svg";
import { projectList } from "../Dashboard/ProjectManager";
import { removeTask, toggleCompletedStatus, toggleImportantStatus,
        setTaskDueDate } from "./TaskManager";
import { renderTasks } from "./TaskRenderer";


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
    const task = projectList.currentProject.getTaskById(taskId);
    completedIcon.addEventListener("click", () => {
        toggleCompletedStatus(taskId);
        removeTask(taskId);
        
        if (task.isCompleted) {
            // addToCompleted();
            completedIcon.src = completedImg;
            completedIcon.title = "Mark as not completed";
        } else {
            completedIcon.src = notCompletedImg;
            completedIcon.title = "Mark as completed";
        }
        renderTasks(projectList.currentProject);
    })

    completedIcon.addEventListener("mouseenter", () => {
        completedIcon.src = task.isCompleted ? notCompletedImg : completedImg;
    });
    completedIcon.addEventListener("mouseleave", () => {
        completedIcon.src = task.isCompleted ? completedImg : notCompletedImg;
    });
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
    importantIcon.addEventListener("click", () => {
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
    dateIcon.addEventListener("click", () => {
        const taskId = parseInt(dateIcon.parentElement.parentElement.dataset.taskId, 10);
        dateInput.style.display = 'block';
        dateInput.focus();

        const handleDateInput = () => {
            const parsedDate = parseISO(dateInput.value);
            if (isValid(parsedDate)) {
                const formattedDate = format(parsedDate, 'yyyy-MM-dd');
                setTaskDueDate(taskId, formattedDate);
            } else {
                console.error("Invalid date value");
                dateInput.value = '';
            }
            dateInput.style.display = 'none';
        }

        dateInput.addEventListener('blur', handleDateInput);
        dateInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                handleDateInput();
            }
        });
    })
}