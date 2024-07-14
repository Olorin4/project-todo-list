// MainContent.js handles DOM interactions of the main-content section.

import { initializeTabs, switchTab, setCurrentProject } from './TabManager';
import { Project, Task, projects } from './Objects';

let projectCount = 3;
let taskCount = 0;

function renderProject(id, title) {
    const projectList = document.querySelector('.project-list');

    // Create input field for a project:
    const projectTitle = document.createElement('input');
    projectTitle.type = 'text';
    projectTitle.value = title;
    projectTitle.classList.add('project');
    projectTitle.dataset.project = id;
    projectTitle.readOnly = true;

    // Setup event listeners for the project input
    setupProjectEvents(id, projectTitle);

    projectList.appendChild(projectTitle);

    // Create a corresponding task list:
    const taskListContainer = document.querySelector('.task-list-container');
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');
    taskList.id = `tab-${id}`;
    taskListContainer.appendChild(taskList);

    // Add project to the projects object
    projects[id] = new Project(id, title);

    // Make the newly created project the current project
    setCurrentProject(id, projectTitle);

    // Reinitialize tab switching
    initializeTabs();
}

function setupProjectEvents(id, projectTitle) {
    // Set up event listener for switching tabs:
    projectTitle.addEventListener('click', () => {
        setCurrentProject(id, projectTitle);
    });

    // Event listener for double-click to make input editable:
    projectTitle.addEventListener('dblclick', () => {
        projectTitle.readOnly = false;
        projectTitle.classList.add('editable');
        projectTitle.focus(); // Focus the input field for immediate editing
    });

    // Event listener for blur to make input read-only again:
    projectTitle.addEventListener('blur', () => {
        projectTitle.readOnly = true;
        projectTitle.classList.remove('editable');
    });

    // Event listener for enter key to make input read-only again:
    projectTitle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            projectTitle.readOnly = true;
            projectTitle.classList.remove('editable');
        }
    });
}


function loadDefaults() {
    const defaultProjects = [
        new Project(1, 'Personal'),
        new Project(2, 'Work'),
        new Project(3, 'Grocery List')
    ];

    // Render input fields for each default project:
    defaultProjects.forEach(project => {
        renderProject(project.id, project.title);
    });

    // Show the first project by default and set it as active
    const firstProject = defaultProjects[0];
    const firstProjectElement = document.querySelector(`.project[data-project="${firstProject.id}"]`);
    firstProjectElement.click();
}

function createTask(projectId, taskTitle) {
    const currentProject = projects[projectId];
    taskCount++;
    const newTask = new Task(taskCount, taskTitle);
    currentProject.addTask(newTask);

    // Update the DOM to display the new task
    const taskList = document.getElementById(`tab-${projectId}`);
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.textContent = taskTitle;
    taskList.appendChild(taskCard);
}

function setupAddTaskListener() {
    const taskTitleInput = document.querySelector('.task-title');
    taskTitleInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const taskTitle = taskTitleInput.value.trim();
            if (taskTitle) {
                const activeProjectElement = document.querySelector('.project.current-project');
                if (activeProjectElement) {
                    const projectId = activeProjectElement.dataset.project;
                    createTask(projectId, taskTitle);
                    taskTitleInput.value = ""; // Clear input field
                } else {
                    console.error("No active project found");
                }
            }
        }
    });
}

function loadMainContent() {
    loadDefaults();
    initializeTabs();
    setupAddTaskListener();
}

document.querySelector('.add-project').addEventListener('click', () => {
    projectCount++;
    const newProject = new Project(projectCount, `Project ${projectCount}`);
    renderProject(newProject.id, newProject.title);
});

export { loadMainContent };