// MainContent.js handles DOM interactions of the main-content section.

import { TabInitializer, TabSwitcher } from './TabManager';
import { Project, Task } from './Objects';

let projectCount = 3;
let taskCount = 0;
const tabSwitcher = new TabSwitcher();
const projects = {}; // Store projects

function createProject(id, title) {
    const projectList = document.querySelector('.project-list');

    // Create input field for a project:
    const projectInput = document.createElement('input');
    projectInput.type = 'text';
    projectInput.value = title;
    projectInput.classList.add('project');
    projectInput.dataset.project = id;
    projectInput.readOnly = true; // Make input read-only by default

    // Event listener for switching tabs:
    projectInput.addEventListener('click', () => {
        // Remove current-project class from all projects
        document.querySelectorAll('.project').forEach(proj => {
            proj.classList.remove('current-project');
        });
        // Add current-project class to the clicked project
        projectInput.classList.add('current-project');
        tabSwitcher.switchTab(id);
    });

    // Event listener for double-click to make input editable:
    projectInput.addEventListener('dblclick', () => {
        projectInput.readOnly = false;
        projectInput.classList.add('editable');
        projectInput.focus(); // Focus the input field for immediate editing
    });

    // Event listener for blur to make input read-only again:
    projectInput.addEventListener('blur', () => {
        projectInput.readOnly = true;
        projectInput.classList.remove('editable');
    });

    projectList.appendChild(projectInput);

    // Create a corresponding task list container:
    const taskListContainer = document.querySelector('.task-list-container');
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');
    taskList.id = `tab-${id}`;
    taskListContainer.appendChild(taskList);

    // Add project to the projects object
    projects[id] = new Project(id, title);
}

class DefaultProjectLoader {
    constructor() {
        this.loadDefaults();
    }

    loadDefaults() {
        const defaultProjects = [
            new Project(1, 'Personal'),
            new Project(2, 'Work'),
            new Project(3, 'Grocery List')
        ];

        // Create input fields for each default project:
        defaultProjects.forEach(project => {
            createProject(project.id, project.title);
        });

        // Show the first project by default and set it as active
        document.querySelector('.project').classList.add('current-project');
        tabSwitcher.switchTab('1');
    }
}

function createTask(projectId, taskTitle) {
    const currentProject = projects[projectId];
    taskCount++;
    const newTask = new Task(taskCount, taskTitle);
    currentProject.addTask(newTask);

    // Update the DOM to display the new task
    const taskList = document.getElementById(`tab-${projectId}`);
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card'); // Renamed to taskCard
    taskCard.textContent = taskTitle;
    taskList.appendChild(taskCard);
}

function loadMainContent() {
    new TabInitializer();
    new DefaultProjectLoader();

    // Add event listener for the "Add Project" button:
    const addProjectButton = document.querySelector('.add-project');
    addProjectButton.addEventListener('click', () => {
        projectCount++;
        const newProject = new Project(projectCount, `Project ${projectCount}`);
        createProject(newProject.id, newProject.title);

        // Set the newly added project as active
        document.querySelectorAll('.project').forEach(proj => {
            proj.classList.remove('current-project');
        });
        document.querySelector(`.project[data-project="${newProject.id}"]`).classList.add('current-project');
    });

    // Add event listener for the "Add new Task" input field:
    const taskTitleInput = document.querySelector('.task-title');
    taskTitleInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const taskTitle = taskTitleInput.value.trim();
            if (taskTitle) {
                const activeProjectElement = document.querySelector('.project.current-project');
                if (activeProjectElement) {
                    const currentProjectId = activeProjectElement.dataset.project;
                    createTask(currentProjectId, taskTitle);
                    taskTitleInput.value = ''; // Clear the input field after adding the task
                } else {
                    console.error("No active project found");
                }
            }
        }
    });
}

export { loadMainContent };