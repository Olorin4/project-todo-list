// TaskTaskRenderer.js handles UI logic of the TaskCard,
// which includes several icons and html elements.
import starImg from '../assets/star-plus-outline.svg';
import completedImg from "../assets/check-square.svg";
import calendarImg from "../assets/calendar-black.svg";
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { createTask, removeTask, toggleCompletedStatus, markTaskAsImportant,
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

        const taskTitle = document.createElement("span");
        taskTitle.textContent = task.title;
        taskTitle.contentEditable = true;
        taskTitle.addEventListener("blur", () => {
            task.title = taskTitle.textContent; // Update task title on blur
        })
        taskCard.appendChild(taskTitle);
        
        renderTaskLinks(taskCard);
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
    completedLink.src = completedImg;
    completedLink.alt = "Mark as completed";
    linksContainer.appendChild(completedLink);
    setupCompletedLink();

    const importantLink = document.createElement("img");
    importantLink.classList.add("task-links");
    importantLink.id = "link-2";
    importantLink.src = starImg;
    importantLink.alt = "Mark as important";
    linksContainer.appendChild(importantLink);

    const dateLink = document.createElement("img");
    dateLink.classList.add("task-links");
    dateLink.id = "link-3";
    dateLink.src = calendarImg;
    dateLink.alt = "Set due date";
    linksContainer.appendChild(dateLink);
}


function setupCompletedLink() {
    //Event listeners for changing task status (completed, important, due date):
    const completedLink = document.getElementById("link-1");
    completedLink.addEventListener("click", event => {
        const taskId = parseInt(completedLink.parentElement.id);
        const taskCard = event.target.closest(".task-card");
        const taskTitle = taskCard.querySelector('.task-title');
        const task = projectList.currentProject.getTaskById(taskId);
        
        toggleCompletedStatus(taskId);

        task.isCompleted ? taskCard.classList.add("completed-task")
            : taskCard.classList.remove("completed-task");
        
        logTaskList();
    })
}


function disableLinks() {

}


export { setupAddTask, renderTasks };