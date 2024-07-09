// TabManager.js handles tab management (initialization and switching).

import { Project } from "./Objects";

class TabSwitcher {
    switchTab(projectId) {
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
}

class TabInitializer {
    constructor() {
        this.projectButtons = document.querySelectorAll('.project');
        this.tabSwitcher = new TabSwitcher();
        this.initTabs();
    }

    initTabs() {
        this.projectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const projectId = e.target.dataset.project;
                this.tabSwitcher.switchTab(projectId);
            });
        });
    }
}

export { TabInitializer, TabSwitcher };