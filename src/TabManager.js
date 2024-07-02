class TabSwitcher {
    constructor() {
        this.projectButtons = document.querySelectorAll('.project');
        this.initTabs();
    }

    initTabs() {
        this.projectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const projectId = e.target.dataset.project;
                this.switchTab(projectId);
            });
        });

        // Show the first tab by default
        this.switchTab('1');
    }

    switchTab(projectId) {
        document.querySelectorAll('.task-list').forEach(taskList => {
            taskList.style.display = 'none';
        });

        document.getElementById(`tab-${projectId}`).style.display = 'block';
    }
}

export default TabSwitcher;