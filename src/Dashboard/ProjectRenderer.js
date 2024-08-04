// ProjectRenderer.js handles DOM manipulation of the Projects menu item.
import deleteSVG from "../assets/delete.svg";
import { renderCurrentProject } from "../MainContent/TaskRenderer";
import { projectList, setCurrentProject, createProject,
    deleteProject, renameProject } from "./ProjectManager";
import { initDropdownMenu } from "component-dropdown-menu";

function renderProjects() {
    const projectsCard = document.querySelector(".project-list");
    projectsCard.innerHTML = "";

    projectList.projects.forEach(project => {
        const projectTab = document.createElement("div");
        projectTab.classList.add("project");
        projectTab.dataset.projectId = project.id; // Set data-project-id attribute
        projectsCard.appendChild(projectTab);

        const projectTitle = document.createElement("input");
        projectTitle.value = project.title;
        projectTitle.classList.add('project-title');
        projectTab.appendChild(projectTitle);
        setupInputProperties(project.id, projectTitle)

        initDropdownMenu(projectTab);
        setupDeleteProject(projectTab);
        setupRenameProject(projectTab, project.id, projectTitle);
    });
    
}


function setupAddProjectButton() {
    const addBtn = document.querySelector(".add-project");
    addBtn.addEventListener("click", () => {
        const newProjectId = projectList.projectCount + 1;
        createProject(newProjectId, `Project ${newProjectId}`);
        renderProjects();
        renderCurrentProject();
    });
}


function setupDeleteProject(projectTab) {
    document.querySelectorAll(".dropdown-item2").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            if (projectList.projects.length == 1) { return }

            const projectId = parseInt(projectTab.dataset.projectId, 10);
            deleteProject(projectId);
            projectTab.remove();
            renderProjects();
            renderCurrentProject();
        });
    });
}


function setupRenameProject(tab, id, title) {
    const dropdownItem1 = tab.querySelector('.dropdown-item1');
    dropdownItem1.addEventListener('click', () => {
        title.classList.add('editable');
        title.focus();
    });

    title.addEventListener('blur', () => {
        title.classList.remove('editable');
        renameProject(id, title.value);
    });

    title.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            title.classList.remove('editable');
            title.blur();
        }
    });
}


function setupInputProperties(id, projectTitle) {
    projectTitle.addEventListener('click', () => {
        setCurrentProject(id);
        renderCurrentProject();
    });
}


export { renderProjects, setupAddProjectButton };