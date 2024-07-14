// TabManager.js handles tab management (initialization and switching).

import { Project, projects } from "./Objects";

function switchTab(projectId) {
    document.querySelectorAll('.task-list').forEach(taskList => {
        taskList.style.display = 'none';
    });

    const targetTab = document.getElementById(`tab-${projectId}`);
    if (targetTab) {
        targetTab.style.display = 'block';
    } else {
        console.error(`Tab element with ID tab-${projectId} not found.`);
    }
}

function initializeTabs() {
    const projectButtons = document.querySelectorAll('.project');
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const projectId = e.target.dataset.project;
            switchTab(projectId);
        });
    });
}

function setCurrentProject(id, projectTitle) {
    // Unset current-project status for all projects in the projects object
    Object.values(projects).forEach(proj => {
        proj.unsetCurrent();
    });

    // Set current-project status for the specified project
    projects[id].setCurrent();

    // Remove current-project class from all project elements
    document.querySelectorAll('.project').forEach(proj => {
        proj.classList.remove('current-project');
    });

    // Add current-project class to the specified project element
    projectTitle.classList.add('current-project');
    switchTab(id);
}

export { initializeTabs, switchTab, setCurrentProject };