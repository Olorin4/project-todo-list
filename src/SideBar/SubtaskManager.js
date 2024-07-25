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


function removeSubtask(subtaskId) {
    const currentTask = projectList.currentProject.currentTask;
    if (!currentTask) {
        console.error(`Task with ID ${currentTask.id} not found.`);
        return;
    }
    currentTask.removeSubtask(subtaskId);
    console.log(`Subtask with ID ${subtaskId} removed.`);
    save(projectList);
}


function toggleCompletedStatus(subtaskId) {
    const currentTask = projectList.currentProject.currentTask;
    const subTask = currentTask.getSubtaskById(subtaskId);
    if (!subTask) {
        console.error(`SubTask with ID ${subtaskId} not found.`);
        return;
    }
    subTask.isCompleted = !subTask.isCompleted;
    console.log(`SubTask with ID ${subtaskId} marked as completed.`);
    save(projectList);
}


function renameSubtask(id, newTitle) {
    const currentTask = projectList.currentProject.currentTask;
    const subtaskToRename = currentTask.getSubtaskById(id);
    subtaskToRename.title = newTitle;
    save(projectList);
}


export { createSubtask, removeSubtask, toggleCompletedStatus, renameSubtask };