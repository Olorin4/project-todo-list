// MainContent.js handles all DOM manipulation of the main-content section.
import { projectList } from "../Dashboard/ProjectManager";
import { createTask, removeTask } from "./TaskManager";


export function renderCurrentProject() {
    const currentProjectTitle = document.querySelector(".current-project h2");
    const currentProject = projectList.getCurrentProject();
    if (currentProject) {
        currentProjectTitle.textContent = currentProject.title;
    } else {
        currentProjectTitle.textContent = "";
        console.error("No current project found.");
    }
}


export function loadMainContent() {
    // renderCurrentProject();
}