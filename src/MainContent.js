// MainContent.js handles UI logic of the main-content section.

import { projectList, Project, Task } from "./Objects";
import { loadDefaults, setCurrentProject, createProject,
        removeProject, logProjectList } from "./ProjectManager";
import { createTask, removeTask } from "./TaskManager";

let projectCount = 0;

function renderDefaultProjects() {
    loadDefaults();

    projectList.projects.forEach(project => {
        renderProject(project.id, project.title);
    });

    projectCount = projectList.projects.length;
    console.log(`projectCount is ${projectCount}`);
}


function setupAddProjectButton() {
    const addBtn = document.querySelector(".add-project").addEventListener("click", () => {
        projectCount++;
        createProject(projectCount, `Project ${projectCount}`);
        renderProject();
        console.log(`projectCount is ${projectCount}`);
        logProjectList();
    });
}


function setupDeleteProjectButton() {
    const projectListContainer = document.querySelector(".project-list");
    projectListContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-project")) {
            // Find the nearest ancestor element with the class "project"
            const projectTab = event.target.closest(".project");

            // Check if projectTab is found
            if (projectTab) {
                const projectId = parseInt(projectTab.dataset.projectId, 10); // Extract the id from data-project-id

                // Remove the project from the projectList
                removeProject(projectId);

                // Remove the project tab from the DOM
                projectTab.remove();

                projectCount--;
                console.log(`projectCount is ${projectCount}`);

                renderProject();
                logProjectList();
            }
        }
    });
}


function renderProject() {
    const projectsCard = document.querySelector(".project-list");
    projectsCard.innerHTML = '';

    projectList.projects.forEach(project => {
        const projectTab = document.createElement("div");
        projectTab.classList.add("project");
        projectTab.dataset.projectId = project.id; // Set data-project-id attribute
        projectsCard.appendChild(projectTab);

        const projectTitle = document.createElement("input");
        projectTitle.value = project.title;
        projectTitle.type = 'text';
        projectTitle.classList.add('project-title');
        projectTitle.readOnly = true;
        projectTab.appendChild(projectTitle);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-project");
        projectTab.appendChild(deleteBtn);

        // Set up event listener for switching tabs:
        projectTitle.addEventListener('click', () => {
            setCurrentProject(project.id);
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
    });
}


function loadMainContent() {
    setupAddProjectButton()
    setupDeleteProjectButton()
    renderDefaultProjects();
    console.log("Main content loaded with defaults");

    
    




    // Experimental:
    
    
    // Debugging:
    logProjectList();
}


export { loadMainContent };