// TaskTaskRenderer.js handles UI logic of the TaskCard,
// which includes several icons and html elements.
import starImg from '../assets/star-plus-outline.svg';
import completedImg from "../assets/check-square.svg";
import calendarImg from "../assets/calendar-black.svg";
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { createTask, removeTask, markTaskAsCompleted, markTaskAsImportant,
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
    const currentProject = projectList.currentProject;

    currentProject.tasks.forEach(task => {
        renderTaskCard();
        const taskCard = document.querySelector(".task-card");
        const taskTitle = document.createElement("span");
        taskTitle.textContent = task.title;
        taskTitle.setAttribute("contenteditable", "true");
        taskTitle.addEventListener("blur", () => {
            // Update the task title in the current project
            task.title = taskTitle.textContent.trim();
        });
        taskCard.appendChild(taskTitle);
        renderLinks();
    });
}


function renderTaskCard() {
    const taskListContainer = document.querySelector(".task-list-container");
    taskListContainer.innerHTML = ""; // Clear any existing tasks
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    taskListContainer.appendChild(taskCard);

}


function renderLinks() {
    const taskCard = document.querySelector(".task-card");

    const linksContainer = document.createElement("div");
    linksContainer.classList.add("task-links-container");
    taskCard.appendChild(linksContainer);
    
    const importantLink = document.createElement("img");
    linksContainer.classList.add("task-links");
    importantLink.src = starImg;
    importantLink.alt = "Mark as important";
    linksContainer.appendChild(importantLink);

    const completedLink = document.createElement("img");
    linksContainer.classList.add("task-links");
    completedLink.src = completedImg;
    completedLink.alt = "Mark as completed";
    linksContainer.appendChild(completedLink);

    const dateLink = document.createElement("img");
    linksContainer.classList.add("task-links");
    dateLink.src = calendarImg;
    dateLink.alt = "Set due date";
    linksContainer.appendChild(dateLink);

    
}


export { setupAddTask, renderTasks };