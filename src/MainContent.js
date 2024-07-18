// MainContent.js handles all UI logic of the main-content section.

import { projectList, loadDefaults } from "./ProjectManager";

export function renderCurrentProject() {
    const currentProjectTitle = document.querySelector(".current-project h2");
    const currentProject = projectList.projects.find(project => project.isCurrent);
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