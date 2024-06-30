class TabManager {
    constructor() {
        this.tabs = document.querySelectorAll('.tab');
        this.addTab = document.querySelector('.add-tab');
        this.deleteTab = document.querySelector('.delete-tab');
        this.initTabs();
    }

    initTabs() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabId = e.target.dataset.tab;
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                document.getElementById(`tab-${tabId}`).style.display = 'block';
            });
        });

        this.addTab.addEventListener('click', this.addNewTab);
        this.deleteTab.addEventListener('click', this.deleteLastTab);

        document.getElementById('tab-1').style.display = 'block'; // Show the first tab by default
    }

    addNewTab() {
        // Logic for adding a new tab
    }

    deleteLastTab() {
        // Logic for deleting the last tab
    }
}

export default TabManager;