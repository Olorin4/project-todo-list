// ProjectRenderer.js handles UI logic of the Projects menu item.

import { Project } from "./Objects";
import { projectList, loadDefaults, setCurrentProject, createProject,
        removeProject, renameProject, logProjectList } from "./ProjectManager";


let projectCount = 0;


function renderDefaultProjects() {
    loadDefaults();

    projectList.projects.forEach(project => {
        renderProject(project.id, project.title);
    });

    projectCount = projectList.projects.length;

    console.log(`projectCount is ${projectCount}`);

    setupAddProjectButton();
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
    document.querySelectorAll(".delete-project").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            // Find the nearest ancestor element with the class "project"
            const projectTab = event.target.closest(".project");
            // Extract the id from data-project-id
            const projectId = parseInt(projectTab.dataset.projectId, 10);  //?
            removeProject(projectId);
            projectTab.remove();

            projectCount--;
            console.log(`projectCount is ${projectCount}`);

            renderProject();
            logProjectList();
        });
    });
}

function setupInputProperties(id, projectTitle) {
    // Set up event listener for switching tabs:
    projectTitle.addEventListener('click', () => {
        projectTitle.blur();
        setCurrentProject(id);
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