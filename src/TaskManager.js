// TaskManager.js

import { projectList, Project, Task } from "./Objects";


function createTask(description, projectId) {
    const project = projectList.getProjectById(projectId);

    if (!project) {
        console.error(`Project with ID ${projectId} not found.`);
        return;
    }

    // Calculate the task ID based on the current number of tasks in the project's taskList
    const taskId = project.taskList.length + 1;

    // Create a new task instance
    const newTask = new Task(taskId, description, projectId);
    project.addTask(newTask);

    console.log(`Task created: ${newTask.description} (ID: ${newTask.id})`);
}


function removeTask(taskId, projectId) {
    const project = projectList.getProjectById(projectId);
    project.removeTask(taskId);
    
    console.log(`Task removed: ID ${taskId} from project ${projectId}`);
}


function markAsCompleted() {

}



export { createTask, removeTask };