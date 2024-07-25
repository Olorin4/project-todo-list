// SidebarRenderer.js handles UI logic of the SideBar,
// which includes notes, subtasks and icons.
import completedImg from "../assets/completed.svg";
import notCompletedImg from "../assets/not-completed.svg";
import PlusSvgBlack from "../assets/plus-black.svg";
import { projectList } from "../Dashboard/ProjectManager";
import {createSubtask, removeSubtask,
    toggleCompletedStatus, renameSubtask } from "./SubtaskManager";
import { saveTaskNotes } from "../MainContent/TaskManager";
import { format, parseISO } from "date-fns";


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
    renderOptions(currentTask, optionsContainer);
}
    

function setupTextArea(currentTask, notesText) {
    notesText.addEventListener("input", () => {
        saveTaskNotes(currentTask, notesText);
    });
}


function renderSubtasks(currentTask, subtasks) {
    subtasks.innerHTML = "";
    currentTask.subtasks.forEach(subtask => {
        const subtaskTab = document.createElement("div");
        subtaskTab.classList.add("subtask-tab");
        subtaskTab.dataset.taskId = subtask.id;
        subtasks.appendChild(subtaskTab);
        
        renderCompletedIcon(subtaskTab, subtask.id);

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


function renderCompletedIcon(subtaskTab, subtaskId) {
    const completedIcon = document.createElement("img");
    completedIcon.classList.add("link-2");
    completedIcon.id = "completed-icon";
    completedIcon.src = notCompletedImg;
    completedIcon.alt = "Mark as completed";
    completedIcon.title = "Mark as completed";
    subtaskTab.appendChild(completedIcon);
    setupCompletedIcon(completedIcon, subtaskId);
}

function setupCompletedIcon(completedIcon, subtaskId) {
    const subtask = projectList.currentProject.currentTask.getSubtaskById(subtaskId);
    completedIcon.addEventListener("click", () => {
        toggleCompletedStatus(subtaskId);
        
        if (subtask.isCompleted) {
            completedIcon.src = completedImg;
            completedIcon.title = "Mark as not completed";
        } else {
            completedIcon.src = notCompletedImg;
            completedIcon.title = "Mark as completed";
        }
        removeSubtask(subtaskId);
        renderSubtasks(projectList.currentProject.currentTask, completedIcon.parentElement.parentElement);
    })

    completedIcon.addEventListener("mouseenter", () => {
        completedIcon.src = subtask.isCompleted ? notCompletedImg : completedImg;
    });
    completedIcon.addEventListener("mouseleave", () => {
        completedIcon.src = subtask.isCompleted ? completedImg : notCompletedImg;
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


function renderOptions(currentTask, optionsContainer) {
    if (currentTask.dueDate) {
        const dueDate = document.createElement("div");
        dueDate.textContent = `This task is due on ${format(parseISO(currentTask.dueDate), 'yyyy-MM-dd')}.`;
        optionsContainer.appendChild(dueDate);
    }
}


export { renderCurrentTask, renderSubtasks };