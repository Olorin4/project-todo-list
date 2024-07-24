// SidebarRenderer.js handles UI logic of the SideBar,
// which includes notes, subtasks and icons.
import { save } from "../Dashboard/ProjectSaver";
import PlusSvgBlack from "../assets/plus-black.svg";
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import {createSubtask, removeSubtask,
    toggleCompletedStatus, renameSubtask } from "./SubtaskManager";
import { add } from "date-fns";


function renderCurrentTask() {
    const currentTask = projectList.currentProject.currentTask;
    const currentTaskTitle = document.querySelector(".current-task h4");
    const taskDetails = document.querySelector(".task-details");

    if (!currentTask) {
        currentTaskTitle.innerHTML = "";
        taskDetails.innerHTML = "";
        taskDetails.style.opacity = "0";
        console.error("No current task found.");
    } else {
        currentTaskTitle.textContent = currentTask.title;
        taskDetails.style.opacity = "1";
        renderTaskDetails(currentTask);
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
    notesText.value = currentTask.notes || "";
    notesContainer.appendChild(notesText);
    setupTextArea(currentTask, notesText);

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
    

function setupTextArea(currentTask, notesText) {
    notesText.addEventListener("input", () => {
        currentTask.notes = notesText.value;
        save(projectList);
    });
}


function renderSubtasks(currentTask, subtasks) {
    subtasks.innerHTML = "";
    currentTask.subtasks.forEach(subtask => {
        const subtaskTab = document.createElement("div");
        subtaskTab.classList.add("subtask-tab");
        subtaskTab.dataset.taskId = subtask.id;
        subtasks.appendChild(subtaskTab);
        
        const subtaskTitle = document.createElement("input");
        subtaskTitle.readOnly = true;
        setupInputProperties(subtask.id, subtaskTitle);
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
    });
}


function setupInputProperties(subtaskId, subtaskTitle) {
    subtaskTitle.addEventListener('click', () => {
        subtaskTitle.blur();
    });

    subtaskTitle.addEventListener('dblclick', () => {
        subtaskTitle.readOnly = false;
        subtaskTitle.classList.add('editable');
        subtaskTitle.focus();
    });

    subtaskTitle.addEventListener('blur', () => {
        subtaskTitle.classList.remove('editable');
        subtaskTitle.readOnly = true;
        renameSubtask(subtaskId, subtaskTitle.value);
    });

    subtaskTitle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            subtaskTitle.classList.remove('editable');
            subtaskTitle.readOnly = true;
            subtaskTitle.blur();
        }
    });
}


export { renderCurrentTask, renderSubtasks };