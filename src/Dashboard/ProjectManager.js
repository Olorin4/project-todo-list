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
    console.log("Creating a new default projectList...");
    projectList = new ProjectList();
    const defaultProjects = [
        new Project(1, "Personal"),
        new Project(2, "Work"),
        new Project(3, "Grocery List"),
    ];

    console.log("Default projects created:", defaultProjects);

    // Add default projects to the projectList object
    defaultProjects.forEach(project => {
        projectList.addProject(project);
    });

    // Set the first project as current by default
    setCurrentProject(defaultProjects[0].id);
}


function setCurrentProject(id) {
    const projectToSetAsCurrent = projectList.getProjectById(id);

    if (!projectToSetAsCurrent) {
        console.error(`Project with ID ${id} not found.`);
        return;
    }
    if (projectToSetAsCurrent.isCurrent) {
        return; // No need to update if already current
    }

    // Unset current-project status for all projects in the projectList object
    projectList.projects.forEach(proj => {
        proj.isCurrent = false;
    });

    unsetCurrentTask();
    
    // Set current-project status for the specified project
    projectToSetAsCurrent.isCurrent = true;
    
    console.log(`Current project set: ${projectToSetAsCurrent.title} (ID: ${id})`);

    save(projectList);
}


function createProject(id, title) {
    const newProject = new Project(id, title);
    projectList.addProject(newProject);

    console.log(`Project ${title} with ID ${id} created.`);

    setCurrentProject(id);
}


function deleteProject(id) {
    const projectToRemove = projectList.getProjectById(id);

    // Remove the project from projectList
    projectList.removeProject(id);
    save(projectList);
    console.log(`Project removed: ${projectToRemove.title} (ID: ${id})`);

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
    console.log(`Project with ID ${id} renamed to ${newTitle}.`);
    save(projectList);
    logProjectList();
}


// Function to log projectList and its contents
function logProjectList() {
    console.log("Project List:", projectList.projects);
}


export {
    projectList, initializeProjectList, setCurrentProject,
    createProject, deleteProject, renameProject, logProjectList
};