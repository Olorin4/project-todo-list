// MainContent.js handles UI logic of the main-content section.

import { projectList, Project, Task } from "./Objects";
import { loadDefaults, setCurrentProject, createProject,
        removeProject, logProjectList } from "./ProjectManager";
import { createTask, removeTask } from "./TaskManager";

let projectCount = 3;


function renderDefaultProjects() {

}


function setupAddProjectButton() {
    // add event listener for add-project button that creates a new project 

    const addButton = document.querySelector(".add-project").addEventListener("click", () => {
        projectCount++;
        createProject(`project-${projectCount}`, "");
        renderProject(projectCount, `Project ${projectCount}`);
        logProjectList();
    });
}


function setupDeleteProjectButton() {

}


function renderProject(id, title) {
    // Creates a new input field under the project-list div with the new project.
    const projectCard = document.querySelector(".project-list");
    const projectTitle = document.createElement('input');
    projectCard.appendChild(projectTitle);
    projectTitle.type = 'text';
    projectTitle.value = title;
    projectTitle.classList.add('project');
    projectTitle.id = `project-${id}`;
    // projectTitle.placeholder = "name";
    projectTitle.readOnly = true;

    // Set up event listener for switching tabs:
    projectTitle.addEventListener('click', () => {
        setCurrentProject(id, title);
    });

    // Event listener for double-click to make input editable:
    projectTitle.addEventListener('dblclick', () => {
        projectTitle.readOnly = false;
        projectTitle.classList.add('editable');
        projectTitle.focus(); // Focus the input field for immediate editing
    });

    // Event listener for blur to make input read-only again:
    projectTitle.addEventListener('blur', () => {
        projectTitle.classList.remove('editable');
        projectTitle.readOnly = true;
    });

    // Event listener for enter key to make input read-only again:
    projectTitle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            projectTitle.classList.remove('editable');
            projectTitle.readOnly = true;
            projectTitle.blur();
        }
    });
}



function loadMainContent() {
    loadDefaults();
    console.log("Main content loaded with defaults");

    renderDefaultProjects();
    setupAddProjectButton()




    // Experimental:
    
    
    // Debugging:
    logProjectList();
}


export { loadMainContent };