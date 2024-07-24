// SubtaskTaskRenderer.js handles UI logic of the SideBar,
// which includes notes, subtasks and icons.
import PlusSvgBlack from "../assets/plus-black.svg";
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { createSubtask, removeSubtask, toggleCompletedStatus } from "./SubtaskManager";
import { add } from "date-fns";


function clearSidebar() {
    const currentTaskTitle = document.querySelector(".current-task h4");
    const taskDetails = document.querySelector(".task-details");

    // Clear the content of the title and task details container
    currentTaskTitle.innerHTML = "";
    taskDetails.innerHTML = "";
}


function renderCurrentTask() {
    const currentTask = projectList.currentProject.currentTask;
    const currentTaskTitle = document.querySelector(".current-task h4");
    const taskDetails = document.querySelector(".task-details");
    taskDetails.style.opacity = "1";

    if (!currentTask) {
        clearSidebar();
        console.error("No current task found.");
    } else {
        console.log("Current Task:", currentTask);
        currentTaskTitle.textContent = currentTask.title;
        renderTaskDetails(currentTask);
    }
}


function renderTaskDetails(currentTask) {    
    const taskDetails = document.querySelector(".task-details");
    taskDetails.style.opacity = "1";

    if (!currentTask) {
        // Do not render details if no current task
        return;
    }

    taskDetails.innerHTML = "";

    // Create notes container
    const notesContainer = document.createElement("div");
    notesContainer.classList.add("notes-container");
    notesContainer.textContent = "NOTES";
    taskDetails.appendChild(notesContainer);

    const notesText = document.createElement("textarea");
    notesText.setAttribute("cols", "35");
    notesText.setAttribute("rows", "10");
    notesContainer.appendChild(notesText);

    // Create subtasks container
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

    // Create subtasks display area
    const subtasks = document.createElement("div");
    setupAddSubtaskButton(currentTask, subtasks);
    renderSubtasks(currentTask, subtasks);
    subtaskContainer.appendChild(subtasks);

    // Create options container
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");
    optionsContainer.textContent = "OPTIONS";
    taskDetails.appendChild(optionsContainer);
}
    


function renderSubtasks(currentTask, subtasks) {
    subtasks.innerHTML = "";
    console.log("Subtasks Array:", currentTask.subtasks);
    currentTask.subtasks.forEach(subtask => {
        const subtaskTab = document.createElement("div");
        subtaskTab.classList.add("subtask-tab");
        subtaskTab.dataset.taskId = subtask.id;
        subtasks.appendChild(subtaskTab);
        
        const subtaskTitle = document.createElement("input");
        subtaskTitle.readOnly = true;
        // setupInputProperties(subtask.id, subtask.title);
        subtaskTitle.value = subtask.title;
        subtaskTab.appendChild(subtaskTitle);
    });
}


function setupAddSubtaskButton(currentTask, subtasks) {
    const addBtn = document.querySelector(".add-subtask");
    addBtn.addEventListener("click", () => {
        console.log("Add Button Clicked");
        const newSubtaskId = currentTask.subtasksCount + 1;
        console.log("New Subtask ID:", newSubtaskId);
        createSubtask(newSubtaskId, `Subtask ${newSubtaskId}`);
        renderSubtasks(currentTask, subtasks);
        console.log(`SubtasksCount is ${currentTask.subtasksCount}`);
    });
}


function setupInputProperties(subtaskId, subtaskTitle) {
    subtaskTitle.addEventListener('click', () => {
        subtaskTitle.blur();
    });

    // Event listener for double-click to make input editable:
    subtaskTitle.addEventListener('dblclick', () => {
        subtaskTitle.readOnly = false;
        subtaskTitle.classList.add('editable');
        subtaskTitle.focus(); // Focus the input field for immediate editing
    });

    // Event listener for blur to make input read-only again:
    subtaskTitle.addEventListener('blur', () => {
        subtaskTitle.classList.remove('editable');
        subtaskTitle.readOnly = true;
        renameSubtask(id, subtaskTitle.value);
    });

    // Event listener for enter key to make input read-only again:
    subtaskTitle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            subtaskTitle.classList.remove('editable');
            subtaskTitle.readOnly = true;
            subtaskTitle.blur();
        }
    });
}


export { renderCurrentTask, renderSubtasks };