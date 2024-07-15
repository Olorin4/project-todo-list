// MainContent.js handles UI logic of the main-content section.

import { projectList, Project, Task } from "./Objects";
import { loadDefaults, setCurrentProject, createProject,
        removeProject, logProjectList } from "./ProjectManager";
import { createTask, removeTask } from "./TaskManager";

let projectCount = 3;


function setupAddProjectButton() {
    const projectCard = document.querySelector(".project-list");
    const addBtn = document.querySelector(".add-project").addEventListener("click", () => {
        projectCount++;
        const project = createProject(projectCount, `Project ${projectCount}`);
        renderProject(project);
        logProjectList();
    });
}


function setupDeleteProjectButton() {
    const projectCard = document.querySelector(".project-list");
    const deleteBtn = document.querySelectorAll(".delete-project").addEventListener("click", () => {
        const project = removeProject(getProjectById(id));
        project.remove();
        projectCount--;
        logProjectList();
    });
}


function renderProject(project) {
    // Creates a new input field under the project-list div with the new project.
    const projectCard = document.querySelector(".project-list");
    const projectTitle = document.createElement("input");
    projectTitle.id = project.id;
    projectTitle.value = project.title;
    projectTitle.type = 'text';
    projectTitle.classList.add('project');
    // projectTitle.placeholder = "name";
    projectTitle.readOnly = true;
    projectCard.appendChild(projectTitle);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add(".delete-project");
    projectTitle.appendChild(deleteBtn);

    const deleteSvg = document.createElement("img");
    deleteSvg.src = "./assets/delete.svg";
    deleteSvg.alt = "Delete project";
    deleteBtn.appendChild(deleteSvg);

    deleteBtn.addEventListener("click", () => {
        removeProject(project.id);
        projectTitle.remove();
        logProjectList();
    });

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


function renderDefaultProjects() {

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