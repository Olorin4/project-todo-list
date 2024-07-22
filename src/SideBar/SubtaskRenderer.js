// SubtaskTaskRenderer.js handles UI logic of the SideBar,
// which includes notes, subtasks and icons.
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { createSubtask, removeSubtask, toggleCompletedStatus } from "./SubtaskManager";


function renderCurrentTask() {
    const currentTaskTitle = document.querySelector(".current-task h2");

    if (projectList.currentProject.currentTask) {
        currentTaskTitle.textContent = projectList.currentProject.currentTask.title;
        renderSubtasks();
    } else {
        currentTaskTitle.textContent = "";
        console.error("No current task found.");
    }
}


function renderSubtasks() {
    const subtaskListContainer = document.querySelector(".subtasks");
    subtaskListContainer.innerHTML = ""; // Clear any existing tasks

    const currentTask = projectList.currentProject.currentTask;

    currentTask.subtasks.forEach(task => {
        const subtaskCard = document.createElement("div");
        subtaskCard.classList.add("subtask-card");
        subtaskCard.dataset.taskId = subtask.id;
        subtaskListContainer.appendChild(subtaskCard);
        
        const subtaskTitle = document.createElement("input");
        subtaskTitle.value = subtask.title;
        subtaskCard.appendChild(subtaskTitle);
    });
}


export { renderCurrentTask, renderSubtasks };