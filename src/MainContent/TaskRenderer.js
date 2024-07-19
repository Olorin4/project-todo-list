// TaskTaskRenderer.js handles UI logic of the TaskCard,
// which includes several icons and html elements.
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
    const taskListContainer = document.querySelector(".task-list-container");
    taskListContainer.innerHTML = ""; // Clear any existing tasks

    const currentProject = projectList.currentProject;

    currentProject.tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.textContent = task.title;
        taskListContainer.appendChild(taskCard);
    });
}

export { setupAddTask, renderTasks };