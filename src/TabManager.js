// TabManager.js handles tab management (initialization and switching).
import { Project } from "./Project";

class TabSwitcher {
    switchTab(projectId, projectElements) {
        const projectArray = Array.from(projectElements);
        projectArray.forEach(taskList => {
            taskList.style.display = 'none';
        });

        const targetTab = projectArray.find(tab => tab.id === `tab-${projectId}`);
        if (targetTab) {
            targetTab.style.display = 'block';
        } else {
            console.error(`Tab element with ID tab-${projectId} not found.`);
        }
    }
}

class TabInitializer {
    constructor() {
        this.projectCount = document.querySelectorAll('.project').length; // Initialize project count based on existing projects
    }

    initTabs(projectButtons, projectElements) {
        const tabSwitcher = new TabSwitcher();
        projectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (e.target.tagName !== 'INPUT') {
                    const projectId = button.dataset.project;
                    tabSwitcher.switchTab(projectId, projectElements);
                }
            });

            const inputField = button.querySelector('input');
            if (inputField) {
                button.addEventListener('dblclick', () => {
                    inputField.style.display = 'inline';
                    inputField.focus();
                    button.textContent = ''; // Clear the button text content
                });

                inputField.addEventListener('blur', () => {
                    button.textContent = inputField.value;
                    inputField.style.display = 'none';
                });

                inputField.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        button.textContent = inputField.value;
                        inputField.style.display = 'none';
                    }
                });
            }
        });

        // Show the first tab by default
        tabSwitcher.switchTab('1', projectElements);
    }
}

export default TabInitializer;