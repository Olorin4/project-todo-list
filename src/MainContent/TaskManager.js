// TaskManager.js handles all task logic: creating, removing, renaming
// and altering properties of tasks.
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";


function setCurrentTask() {
    const currentProject = projectList.currentProject;
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
        task.unsetCurrent();
    });

    // Set current-task status for the specified task
    taskToSetAsCurrent.setCurrent();

    // Update UI to reflect current task
    renderCurrentTask();
    
    console.log("Current task set:", taskToSetAsCurrent);
}


function createTask(id, title) {
    const currentProject = projectList.currentProject;
    const newTask = new Task(id, title, currentProject.id);
    currentProject.addTask(newTask);

    console.log(`Task with ID ${id} created.`);

    setCurrentTask(id);
}


function removeTask(taskId, projectId) {
    const project = projectList.getProjectById(projectId);
    project.removeTask(taskId);
    
    console.log(`Task removed: ID ${taskId} from project ${projectId}`);
}


function markAsCompleted() {

}


function markAsImportant() {

}


function setDueDate() {

}


// Function to log taskList and its contents
function logTaskList() {
    console.log("Task List:", Project.tasks);
}


export { createTask, removeTask, logTaskList };