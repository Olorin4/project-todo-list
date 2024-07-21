// TaskManager.js handles all task logic: creating, removing, renaming
// and altering properties of tasks.
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";


function setCurrentTask(id) {
    const currentProject = projectList.currentProject;
    if (!currentProject) {
        console.error("No current project selected.");
        return;
    }

    const taskToSetAsCurrent = currentProject.getTaskById(id);

    if (!taskToSetAsCurrent) {
        console.error(`Task with ID ${id} not found.`);
        return;
    }
    if (taskToSetAsCurrent.isCurrent) {
        return; // No need to update if already current
    }

    // Unset current-task status for all tasks in the project
    currentProject.tasks.forEach(task => {
        task.isCurrent = false;
    });

    // Set current-task status for the specified task
    taskToSetAsCurrent.isCurrent = true;
    
    console.log(`Current task set: ${taskToSetAsCurrent.title} (ID: ${id})`);
}


function createTask(id, title) {
    const currentProject = projectList.currentProject;
    if (!currentProject) {
        console.error("No current project selected.");
        return;
    }
    
    const newTask = new Task(id, title, currentProject.id);
    currentProject.addTask(newTask);

    console.log(`Task ${title} with ID ${id} created, under project ${currentProject.title}.`);

    setCurrentTask(id);
}


function removeTask(taskId, projectId) {
    const project = projectList.getProjectById(projectId);
    if (!project) {
        console.error(`Project with ID ${projectId} not found.`);
        return;
    }
    project.removeTask(taskId);
    
    console.log(`Task removed: ID ${taskId} from project ${projectId}`);
}


function toggleCompletedStatus(id) {
    const currentProject = projectList.currentProject;
    console.log(`Current Project: ${currentProject.title}`);
    console.log(`Tasks in Current Project:`, currentProject.tasks);

    const task = currentProject.getTaskById(id);
    if (!task) {
        console.error(`Task with ID ${id} not found.`);
        return;
    }

    task.isCompleted = !task.isCompleted;
    console.log(`Task with ID ${id} marked as completed.`);
}


function toggleImportantStatus(id) {
    const currentProject = projectList.currentProject;
    console.log(`Current Project: ${currentProject.title}`);
    console.log(`Tasks in Current Project:`, currentProject.tasks);

    const task = currentProject.getTaskById(id);
    if (!task) {
        console.error(`Task with ID ${id} not found.`);
        return;
    }

    task.isImportant = !task.isImportant;
    console.log(`Task with ID ${id} marked as important.`);
}


function setTaskDueDate(id, dueDate) {
    const currentProject = projectList.currentProject;
    if (!currentProject) {
        console.error("No current project selected.");
        return;
    }

    const task = currentProject.getTaskById(id);
    if (!task) {
        console.error(`Task with ID ${id} not found.`);
        return;
    }

    task.setDueDate(dueDate);
    console.log(`Due date set for task with ID ${id}.`);
}


// Function to log taskList and its contents
function logTaskList() {
    console.log("Task List:");
    projectList.projects.forEach(project => {
        console.log(`Project ID ${project.id}: ${project.title}`);
        project.tasks.forEach(task => {
            console.log(`  - Task ID ${task.id}: ${task.title} 
                (Current:${task.isCurrent}, Completed: ${task.isCompleted}, Important: ${task.isImportant}, Due Date: ${task.dueDate})`);
        });
    });
}


export { createTask, removeTask, toggleCompletedStatus,
    toggleImportantStatus, setTaskDueDate, logTaskList };