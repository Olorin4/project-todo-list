// TaskManager.js handles all task logic: creating, removing, renaming
// and altering properties of tasks.
import { Task } from "../Objects";
import { projectList } from "../Dashboard/ProjectManager";
import { save } from "../Dashboard/ProjectSaver";


function setCurrentTask(id) {
    const currentProject = projectList.currentProject;
    const taskToSetAsCurrent = currentProject.getTaskById(id);

    if (!taskToSetAsCurrent) {
        console.error(`Task with ID ${id} not found.`);
        return;
    } else if (taskToSetAsCurrent.isCurrent) { return }
    
    unsetCurrentTask();
    taskToSetAsCurrent.isCurrent = true;
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
    
    const newTask = new Task(id, title, currentProject.id);
    currentProject.addTask(newTask);
    setCurrentTask(id);
}


function removeTask(taskId) {
    const currentProject = projectList.currentProject;
    currentProject.removeTask(taskId);
    save(projectList);
}


function toggleCompletedStatus(id) {
    const currentProject = projectList.currentProject;
    const task = currentProject.getTaskById(id);
    if (!task) {
        console.error(`Task with ID ${id} not found.`);
        return;
    }
    task.isCompleted = !task.isCompleted;
    save(projectList);
}


function toggleImportantStatus(id) {
    const currentProject = projectList.currentProject;
    const task = currentProject.getTaskById(id);
    if (!task) {
        console.error(`Task with ID ${id} not found.`);
        return;
    }
    task.isImportant = !task.isImportant;
    save(projectList);
}


function setTaskDueDate(id, dueDate) {
    const task = projectList.currentProject.getTaskById(id);
    if (!task) {
        console.error(`Task with ID ${id} not found.`);
        return;
    }
    task.dueDate = dueDate;
    save(projectList);
}


function saveTaskNotes(currentTask, notesText) {
    currentTask.notes = notesText.value;
        save(projectList);
}


export { setCurrentTask, unsetCurrentTask, createTask, removeTask,
    toggleCompletedStatus, toggleImportantStatus, setTaskDueDate, saveTaskNotes };