// ProjectRenderer.js handles DOM manipulation of the Projects menu item.
import deleteSVG from "../assets/delete.svg";
import { Project } from "../Objects";
import { renderCurrentProject, renderTasks } from "../MainContent/TaskRenderer";
import { projectList, setCurrentProject, createProject,
    deleteProject, renameProject } from "./ProjectManager";


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
        projectTitle.type = 'text';
        projectTitle.classList.add('project-title');
        projectTitle.readOnly = true;
        projectTab.appendChild(projectTitle);
        setupInputProperties(project.id, projectTitle)

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-project");
        projectTab.appendChild(deleteBtn);
        const deleteSvg = document.createElement("img");
        deleteSvg.src = deleteSVG;
        deleteSvg.alt = "Delete project";
        deleteSvg.title = "Delete project";
        deleteBtn.appendChild(deleteSvg);
    });
    setupDeleteProjectButton();
}


function setupAddProjectButton() {
    const addBtn = document.querySelector(".add-project").addEventListener("click", () => {
        const newProjectId = projectList.projectCount + 1;
        createProject(newProjectId, `Project ${newProjectId}`);
        renderProjects();
        renderCurrentProject();
    });
}


function setupDeleteProjectButton() {
    document.querySelectorAll(".delete-project").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            if (projectList.projects.length == 1) { return }

            const projectTab = event.target.closest(".project");
            const projectId = parseInt(projectTab.dataset.projectId, 10);  //?
            deleteProject(projectId);
            projectTab.remove();
            renderProjects();
            renderCurrentProject();
        });
    });
}


function setupInputProperties(id, projectTitle) {
    projectTitle.addEventListener('click', () => {
        projectTitle.blur();
        setCurrentProject(id);
        renderCurrentProject();
    });

    projectTitle.addEventListener('dblclick', () => {
        projectTitle.readOnly = false;
        projectTitle.classList.add('editable');
        projectTitle.focus();
    });

    projectTitle.addEventListener('blur', () => {
        projectTitle.classList.remove('editable');
        projectTitle.readOnly = true;
        renameProject(id, projectTitle.value);
    });

    projectTitle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            projectTitle.classList.remove('editable');
            projectTitle.readOnly = true;
            projectTitle.blur();
        }
    });
}


export { renderProjects, setupAddProjectButton };