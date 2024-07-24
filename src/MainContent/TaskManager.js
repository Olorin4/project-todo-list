// TaskManager.js handles all task logic: creating, removing, renaming
// and altering properties of tasks.
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { save } from "../Dashboard/ProjectSaver";


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

    unsetCurrentTask();

    // Set current-task status for the specified task
    taskToSetAsCurrent.isCurrent = true;
    
    console.log(`Current task set: ${taskToSetAsCurrent.title} (ID: ${id})`);

    save(projectList);
}


function unsetCurrentTask() {
    projectList.projects.forEach(proj => {
        proj.tasks.forEach(task => {
            task.isCurrent = false;
        });
    });
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
    logTaskList();
}


function removeTask(taskId, projectId) {
    const currentProject = projectList.currentProject;
    if (!currentProject) {
        console.error(`Project with ID ${projectId} not found.`);
        return;
    }
    currentProject.removeTask(taskId);
    
    console.log(`Task removed: ID ${taskId} from project ${projectId}`);

    save(projectList);
    logTaskList();
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

    save(projectList);
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
    console.log(`Task with ID ${id} marked as ${task.isImportant}.`);

    save(projectList);
}


function setTaskDueDate(id, dueDate) {
    const task = projectList.currentProject.getTaskById(id);
    if (!task) {
        console.error(`Task with ID ${id} not found.`);
        return;
    }
    task.dueDate = dueDate;
    console.log(`Task with ID ${id} due date set to ${dueDate}`);

    save(projectList);
}


function saveTaskNotes(currentTask) {
    
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

window.logTaskList = logTaskList;


export { setCurrentTask, unsetCurrentTask, createTask, removeTask,
    toggleCompletedStatus, toggleImportantStatus, setTaskDueDate, logTaskList };