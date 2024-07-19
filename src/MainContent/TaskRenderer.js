// TaskTaskRenderer.js handles UI logic of the TaskCard,
// which includes several icons and html elements.
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { createTask, removeTask, markTaskAsCompleted, markTaskAsImportant,
        setTaskDueDate, logTaskList } from "../MainContent/TaskManager";
    

function setupAddTask() {
    const taskTitleInput = document.querySelector(".task-title").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const taskTitle = taskTitleInput.value.trim();

            if (taskTitle) {
                const currentProject = projectList.currentProject;
                if (currentProject) {
                    const newTaskId = currentProject.taskCount;
                    createTask(newTaskId, taskTitle);
                    renderTask(newTaskId, taskTitle);
                    taskTitleInput.value = "";  // Clear the input field
                } else {
                    console.error("No current project selected.");
                }
            } else {
                console.error("Task title cannot be empty.");
            }
        }
    });
    logTaskList();
}


function renderTask(id, title) {
    const taskListContainer = document.querySelector(".task-list-container");
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.dataset.taskId = id;

    const taskTitle = document.createElement("span");
    taskTitle.textContent = title;
    taskTitle.classList.add("task-title");

    taskDiv.appendChild(taskTitle);
    taskListContainer.appendChild(taskDiv);
}

export { setupAddTask };