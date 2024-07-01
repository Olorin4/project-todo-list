class TabSwitcher {
    constructor() {
        this.projectButtons = document.querySelectorAll('.project');
        this.initTabs();
    }

    initTabs() {
        this.projectButtons.forEach(button => {
            button.addEventListener('click', () =>
                this.switchTab(button.dataset.tab));
        });
    }

    switchTab(tabId) {
        document.querySelectorAll('.task-list').forEach(taskList => {
            taskList.style.display = 'none';
        });
        document.getElementById(`tab-${tabId}`).style.display = 'block';
    }
}

export default TabSwitcher;