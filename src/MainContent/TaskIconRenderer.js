// TaskLinkRenderer.js handles UI logic of all links inside the Task Card.
import { format } from "date-fns";
import starImg from '../assets/star-plus-outline.svg';
import starImgYellow from '../assets/star-plus-outline-yellow.svg';
import completedImg from "../assets/completed.svg";
import notCompletedImg from "../assets/not-completed.svg";
import calendarImg from "../assets/calendar-black.svg";
import { projectList } from "../Dashboard/ProjectManager";
import { createTask, removeTask, toggleCompletedStatus, toggleImportantStatus,
        setTaskDueDate, logTaskList } from "./TaskManager";
import { renderTasks } from "./TaskRenderer";


export function renderTaskIcons(taskCard) {
    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("task-icons-container");
    taskCard.appendChild(iconsContainer);

    const completedLink = document.createElement("img");
    completedLink.classList.add("task-icons");
    completedLink.id = "link-2";
    completedLink.src = notCompletedImg;
    completedLink.alt = "Mark as completed";
    completedLink.title = "Mark as completed";
    iconsContainer.appendChild(completedLink);
    setupCompletedLink(completedLink);

    const importantLink = document.createElement("img");
    importantLink.classList.add("task-icons");
    importantLink.id = "link-3";
    importantLink.src = starImg;
    importantLink.alt = "Mark as important";
    importantLink.title = "Mark as important";
    iconsContainer.appendChild(importantLink);
    setupImportantLink(importantLink);

    const dateLink = document.createElement("img");
    dateLink.classList.add("task-icons");
    dateLink.id = "link-4";
    dateLink.src = calendarImg;
    dateLink.alt = "Set due date";
    dateLink.title = "Set due date";
    iconsContainer.appendChild(dateLink);
    
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = "due-date-input";
    iconsContainer.appendChild(dateInput);
    setupDueDateLink(dateLink);
}


function setupCompletedLink(completedLink) {
    completedLink.addEventListener("click", event => {
        const taskId = parseInt(completedLink.parentElement.parentElement.dataset.taskId);
        const task = projectList.currentProject.getTaskById(taskId);
        
        toggleCompletedStatus(taskId);
        removeTask(taskId, projectList.currentProject.id);
        
        if (task.isCompleted) {
            // addToCompleted();
            completedLink.src = completedImg;
            completedLink.title = "Mark as not completed";
        } else {
            // createTask(taskId, taskTitle);
            completedLink.src = notCompletedImg;
            completedLink.title = "Mark as completed";
        }

        renderTasks();
        logTaskList();
    })
}


function setupImportantLink(importantLink) {
    importantLink.addEventListener("click", event => {
        const taskId = parseInt(importantLink.parentElement.parentElement.dataset.taskId);
        const task = projectList.currentProject.getTaskById(taskId);

        toggleImportantStatus(taskId);

        if (task.isImportant) {
            // addToImportant()
            importantLink.classList.add("important-task");
            importantLink.src = starImgYellow;
            importantLink.title = "Mark as not important";
        } else {
            importantLink.classList.remove("important-task");
            importantLink.src = starImg;
            importantLink.title = "Mark as important";
        }
        
        logTaskList();
    });
}

function setupDueDateLink(dateLink, dateInput) {
    dateLink.addEventListener("click", event => {
        dateInput.style.display = 'block'; // Show the date input
        dateInput.focus();

        dateInput.addEventListener('change', () => {
            const taskId = parseInt(dateLink.parentElement.id);
            const selectedDate = dateInput.value;
            const formattedDate = format(new Date(selectedDate), 'yyyy-MM-dd');
            setTaskDueDate(taskId, formattedDate);
            dateInput.style.display = 'none'; // Hide the date input after selection
        });

        dateInput.addEventListener('blur', () => {
            dateInput.style.display = 'none'; // Hide the date input if it loses focus
        });
    });    
}


function disableLinks() {

}