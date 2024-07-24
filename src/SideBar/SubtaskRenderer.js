// SubtaskTaskRenderer.js handles UI logic of the SideBar,
// which includes notes, subtasks and icons.
import PlusSvgBlack from "../assets/plus-black.svg";
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { createSubtask, removeSubtask, toggleCompletedStatus } from "./SubtaskManager";
import { add } from "date-fns";


function renderCurrentTask() {
    const currentTask = projectList.currentProject.currentTask;
    const currentTaskHeader = document.querySelector(".current-task h2");

    if (projectList.currentProject.currentTask) {
        currentTaskHeader.textContent = projectList.currentProject.currentTask.title;
        renderTaskDetails(currentTask);
    } else {
        currentTaskHeader.textContent = "";
        console.error("No current task found.");
    }
}


function renderTaskDetails(currentTask) {    
    const taskDetails = document.querySelector(".task-details");
    taskDetails.style.opacity = "1";
    taskDetails.innerHTML = "";

    const notesContainer = document.createElement("div");
    notesContainer.classList.add("notes-container");
    notesContainer.textContent = "NOTES";
    taskDetails.appendChild(notesContainer);

    const notesText = document.createElement("textarea");
    notesText.setAttribute("cols", "35");
    notesText.setAttribute("rows", "10");
    notesContainer.appendChild(notesText);

    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtask-container");
    subtaskContainer.textContent = "SUBTASKS";
    taskDetails.appendChild(subtaskContainer);

    const addBtn = document.createElement("img");
    addBtn.classList.add("add-subtask");
    addBtn.src = PlusSvgBlack;
    addBtn.alt = "Add subtask";
    addBtn.title = "Add subtask";
    subtaskContainer.appendChild(addBtn);

    const subtasks = document.createElement("div");
    setupAddSubtaskButton(currentTask, subtasks);
    renderSubtasks(currentTask, subtasks);
    subtaskContainer.appendChild(subtasks);

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");
    optionsContainer.textContent = "OPTIONS";
    taskDetails.appendChild(optionsContainer);
}


function renderSubtasks(currentTask, subtasks) {
    subtasks.innerHTML = "";
    currentTask.subtasks.forEach(subtask => {
        const subtaskTab = document.createElement("div");
        subtaskTab.classList.add("subtask-tab");
        subtaskTab.dataset.taskId = subtask.id;
        subtasks.appendChild(subtaskTab);
        
        const subtaskTitle = document.createElement("input");
        subtaskTitle.value = subtask.title;
        subtaskTab.appendChild(subtaskTitle);
    });
}


function setupAddSubtaskButton(currentTask, subtasks) {
    const addBtn = document.querySelector(".add-subtask");
    addBtn.addEventListener("click", () => {
        const newSubtaskId = currentTask.subtasksCount + 1;
        createSubtask(newSubtaskId, `Subtask ${newSubtaskId}`);
        renderSubtasks(currentTask, subtasks);
        console.log(`SubtasksCount is ${currentTask.subtasksCount}`);
    });
}


export { renderCurrentTask, renderSubtasks };