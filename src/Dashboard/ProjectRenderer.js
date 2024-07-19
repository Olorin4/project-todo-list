// ProjectRenderer.js handles DOM manipulation of the Projects menu item.

import { Project } from "../Objects";
import { projectList, loadDefaults, setCurrentProject, createProject,
    deleteProject, renameProject, logProjectList } from "./ProjectManager";


function renderDefaultProjects() {
    loadDefaults();

    projectList.projects.forEach(project => {
        renderProject(project.id, project.title);
    });

    console.log(`projectCount is ${projectList.projectCount}`);

    renderCurrentProject();
    setupAddProjectButton();
}


function renderCurrentProject() {
    const currentProjectTitle = document.querySelector(".current-project h2");

    if (projectList.currentProject) {
        currentProjectTitle.textContent = projectList.currentProject.title;
    } else {
        currentProjectTitle.textContent = "";
        console.error("No current project found.");
    }
}


function setupAddProjectButton() {
    const addBtn = document.querySelector(".add-project").addEventListener("click", () => {
        const newProjectId = projectList.projectCount + 1;
        createProject(newProjectId, `Project ${newProjectId}`);
        renderProject();
        renderCurrentProject();
        console.log(`projectCount is ${projectList.projectCount}`);
        logProjectList();
    });
}


function setupDeleteProjectButton() {
    document.querySelectorAll(".delete-project").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            if (projectList.projects.length == 1) {
                return  // Don't delete the last remaining project.
            }

            // Find the nearest ancestor element with the class "project"
            const projectTab = event.target.closest(".project");
            // Extract the id from data-project-id
            const projectId = parseInt(projectTab.dataset.projectId, 10);  //?
            deleteProject(projectId);
            projectTab.remove();

            console.log(`projectCount is ${projectList.projectCount}`);

            renderProject();
            renderCurrentProject();
            logProjectList();
        });
    });
}


function setupInputProperties(id, projectTitle) {
    // Set up event listener for switching tabs:
    projectTitle.addEventListener('click', () => {
        projectTitle.blur();
        setCurrentProject(id);
        renderCurrentProject();
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
        renameProject(id, projectTitle.value);
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


function renderProject() {
    const projectsCard = document.querySelector(".project-list");
    projectsCard.innerHTML = "";

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
        setupInputProperties(project.id, projectTitle)

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-project");
        projectTab.appendChild(deleteBtn);
    });
    setupDeleteProjectButton();
}


export { renderDefaultProjects, logProjectList };