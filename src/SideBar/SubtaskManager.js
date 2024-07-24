// SubtaskManager.js handles all subtask logic: creating, removing, renaming
// and altering properties of subtasks.
import { Project, Task, Subtask } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { logTaskList } from "../MainContent/TaskManager";
import { save } from "../Dashboard/ProjectSaver";


function createSubtask(id, title) {
    const currentTask = projectList.currentProject.currentTask;
    if (!currentTask) {
        console.error("No current project selected.");
        return;
    }
    
    const newSubtask = new Subtask(id, title, currentTask.id);
    currentTask.addSubtask(newSubtask);

    console.log(`Subtask ${title} with ID ${id} created, under task ${currentTask.title}.`);
    save(projectList)
    logTaskList();
}


function removeSubtask(SubtaskId, taskId) {
    const currentTask = projectList.currentProject.currentTask;
    if (!currentTask) {
        console.error(`Task with ID ${taskId} not found.`);
        return;
    }
    currentTask.removeSubtask(taskId);
    
    console.log(`Subtask removed: ID ${taskId} from Task ${taskId}`);

    save(projectList);
    logTaskList();
}


function toggleCompletedStatus(id) {
    const currentTask = projectList.currentProject.currentTask;
    console.log(`Current Task: ${currentTask.title}`);
    console.log(`Subtasks in Current Task:`, currentTask.subtasks);

    const SubTask = currentTask.getSubTaskById(id);
    if (!SubTask) {
        console.error(`SubTask with ID ${id} not found.`);
        return;
    }

    SubTask.isCompleted = !SubTask.isCompleted;
    console.log(`SubTask with ID ${id} marked as completed.`);

    save(projectList);
}


export { createSubtask, removeSubtask, toggleCompletedStatus };