// TabManager.js handles tab management (initialization and switching).

import { Project } from "./Objects";

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

export { initializeTabs, switchTab };