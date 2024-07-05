import { TabInitializer, TabSwitcher } from './TabManager';
import { Project } from './Project';

let projectCount = 3;

function loadMainContent() {
    const projectListContainer = document.querySelector('.project-list');

    // Initial projects data
    const initialProjects = [
        new Project(1, 'Personal'),
        new Project(2, 'Work'),
        new Project(3, 'Grocery List')
    ];

    // Create input fields for each initial project
    initialProjects.forEach(project => {
        createProjectInput(projectListContainer, project.id, project.name);
    });

    // Add event listener for the "Add Project" button
    const addProjectButton = document.querySelector('.add-project');
    addProjectButton.addEventListener('click', () => {
        projectCount++;
        const newProject = new Project(projectCount, `Project ${projectCount}`);
        createProjectInput(projectListContainer, newProject.id, newProject.name);
    });

    new TabInitializer();
}

function createProjectInput(container, id, name) {
    const projectInput = document.createElement('input');
    projectInput.type = 'text';
    projectInput.value = name;
    projectInput.classList.add('project-input');
    projectInput.dataset.project = id;
    projectInput.readOnly = true; // Make input read-only by default

    // Event listener for switching tabs
    projectInput.addEventListener('click', () => {
        const tabSwitcher = new TabSwitcher();
        tabSwitcher.switchTab(id);
    });

    // Event listener for double-click to make input editable
    projectInput.addEventListener('dblclick', () => {
        projectInput.readOnly = false;
        projectInput.classList.add('editable');
        projectInput.focus(); // Focus the input field for immediate editing
    });

    // Event listener for blur to make input read-only again
    projectInput.addEventListener('blur', () => {
        projectInput.readOnly = true;
        projectInput.classList.remove('editable');
    });

    container.appendChild(projectInput);

    // Create a corresponding task list container
    const taskListContainer = document.querySelector('.task-list-container');
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');
    taskList.id = `tab-${id}`;
    taskListContainer.appendChild(taskList);
}

export { loadMainContent };