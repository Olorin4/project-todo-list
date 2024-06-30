import ProjectList from './ProjectList';
import TabManager from './TabManager';

function loadMainContent() {
    const projectListsData = [
        { id: 'tab-1', projects: [
            { title: 'Project 1A', description: 'Description for Project 1A' },
            { title: 'Project 1B', description: 'Description for Project 1B' }
        ]},
        { id: 'tab-2', projects: [
            { title: 'Project 2A', description: 'Description for Project 2A' },
            { title: 'Project 2B', description: 'Description for Project 2B' }
        ]},
        { id: 'tab-3', projects: [
            { title: 'Project 3A', description: 'Description for Project 3A' },
            { title: 'Project 3B', description: 'Description for Project 3B' }
        ]}
    ];

    projectListsData.forEach(list => {
        new ProjectList(list.id, list.projects);
    });

    new TabManager();
}

export { loadMainContent };