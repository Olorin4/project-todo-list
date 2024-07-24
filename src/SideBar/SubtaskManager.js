// SubtaskManager.js handles all subtask logic: creating, removing, renaming
// and altering properties of subtasks.
import { Project, Task, Subtask } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { save } from "../Dashboard/ProjectSaver";


function createSubtask(id, title) {
    const currentTask = projectList.currentProject.currentTask;
    if (!currentTask) {
        console.error("No current project selected.");
        return;
    }
    const newSubtask = new Subtask(id, title);
    currentTask.addSubtask(newSubtask);
    save(projectList)
}


function removeSubtask(SubtaskId, taskId) {
    const currentTask = projectList.currentProject.currentTask;
    if (!currentTask) {
        console.error(`Task with ID ${taskId} not found.`);
        return;
    }
    currentTask.removeSubtask(taskId);
    save(projectList);
}


function toggleCompletedStatus(id) {
    const currentTask = projectList.currentProject.currentTask;
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