// SubtaskTaskRenderer.js handles UI logic of the SideBar,
// which includes notes, subtasks and icons.
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { createSubtask, removeSubtask, toggleCompletedStatus } from "./SubtaskManager";


function renderCurrentTask() {
    const currentTaskContainer = document.querySelector(".current-task");
    const currentTaskTitle = document.querySelector(".current-task h2");
    
    const existingDetails = document.querySelector(".current-task-details");
    if (existingDetails) { currentTaskContainer.removeChild(existingDetails); }

    const newCurrentTaskDetails = document.createElement("div");
    newCurrentTaskDetails.classList.add("current-task-details");
    currentTaskContainer.appendChild(newCurrentTaskDetails);

    if (projectList.currentProject.currentTask) {
        currentTaskTitle.textContent = projectList.currentProject.currentTask.title;

        renderNotes(newCurrentTaskDetails)
        renderSubtasks(newCurrentTaskDetails);
        renderOptions(newCurrentTaskDetails);
    } else {
        currentTaskTitle.textContent = "";
        console.error("No current task found.");
    }
}


function renderNotes(currentTaskDetails) {
    const notesContainer = document.createElement("div");
    notesContainer.classList.add("notes");
    notesContainer.textContent = "NOTES";
    currentTaskDetails.appendChild(notesContainer);

    const notesText = document.createElement("textarea");
    notesText.setAttribute("cols", "30");
    notesText.setAttribute("rows", "10");
    notesContainer.appendChild(notesText);
}


function renderSubtasks(currentTaskDetails) {
    const subtaskListContainer = document.createElement("div");
    subtaskListContainer.innerHTML = "";
    subtaskListContainer.classList.add("subtasks");
    subtaskListContainer.textContent = "SUBTASKS";
    currentTaskDetails.appendChild(subtaskListContainer);

    const currentTask = projectList.currentProject.currentTask;
    currentTask.subtasks.forEach(task => {
        const subtaskCard = document.createElement("div");
        subtaskCard.classList.add("subtask-Card");
        subtaskCard.dataset.taskId = subtask.id;
        subtaskListContainer.appendChild(subtaskCard);
        
        const subtaskTitle = document.createElement("input");
        subtaskTitle.value = subtask.title;
        subtaskCard.appendChild(subtaskTitle);
    });
}


function renderOptions(currentTaskDetails) {
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options");
    optionsContainer.textContent = "OPTIONS";
    currentTaskDetails.appendChild(optionsContainer);
}


export { renderCurrentTask, renderSubtasks };