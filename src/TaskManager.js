import { Project, Task } from "./Objects";
import { projectList } from "./ProjectManager";

function createTask(taskId, title, projectId) {
    const project = projectList.getProjectById(projectId);
    if (project) {
        const newTask = new Task(taskId, title, projectId);
        project.addTask(newTask);

        console.log(`Task '${title}' created for Project '${project.title}' with ID '${newTask.id}'`);
    } else {
        console.error(`Project with id ${projectId} not found.`);
    }
}


export { createTask };