// TaskManager.js handles all task logic: creating, removing, renaming
// and altering properties of tasks.
import { Project, Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";


function createTask(id, title, projectId) {
    const currentProject = projectList.getCurrentProject();
    currentProject.tasks.addTask
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



export { createTask, removeTask };