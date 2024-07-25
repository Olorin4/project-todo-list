// ProjectManager.js handles all project logic: creating, deleting
// renaming and setting as current.
import { loadSavedProjectList, save } from "./ProjectSaver";
import { ProjectList, Project } from "../Objects";
import { unsetCurrentTask } from "../MainContent/TaskManager";


let projectList;

function initializeProjectList() {
    const serializedData = localStorage.getItem('projectList');
    if (serializedData) {
        projectList = loadSavedProjectList(serializedData);
    } else {
        loadDefaults(); // Load defaults if no data is found
    }
    save(projectList);
    return projectList;
}


function loadDefaults() {
    projectList = new ProjectList();
    const defaultProjects = [
        new Project(1, "Personal"),
        new Project(2, "Work"),
        new Project(3, "Grocery List"),
    ];

    defaultProjects.forEach(project => {
        projectList.addProject(project);
    });
    setCurrentProject(defaultProjects[0].id);
}


function setCurrentProject(id) {
    const projectToSetAsCurrent = projectList.getProjectById(id);

    if (projectToSetAsCurrent.isCurrent) { return; }

    projectList.projects.forEach(proj => {
        proj.isCurrent = false;
    });
    unsetCurrentTask();
    projectToSetAsCurrent.isCurrent = true;
    save(projectList);
}


function createProject(id, title) {
    const newProject = new Project(id, title);
    projectList.addProject(newProject);
    setCurrentProject(id);
}


function deleteProject(id) {
    const projectToRemove = projectList.getProjectById(id);
    projectList.removeProject(id);
    save(projectList);
    if (!projectToRemove.isCurrent || projectList.projectCount == 0) { return }
    else if (projectToRemove.isCurrent && projectToRemove.id == projectList.projectCount+1) {
        setCurrentProject(id - 1);
    } else {
        setCurrentProject(id);
    } 
}
    

function renameProject(id, newTitle) {
    const projectToRename = projectList.getProjectById(id);
    projectToRename.title = newTitle;
    save(projectList);
}


export {projectList, initializeProjectList, setCurrentProject,
        createProject, deleteProject, renameProject };