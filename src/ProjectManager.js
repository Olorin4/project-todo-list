import { projectList, Project } from "./Objects";

function loadDefaults() {
    console.log("Creating projects...");
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
    console.log(`Setting project ${id} as current`);

    // Unset current-project status for all projects in the projectList object
    projectList.projects.forEach(proj => {
        proj.unsetCurrent();
    });

    // Set current-project status for the specified project
    projectList.getProjectById(id).setCurrent();

    console.log("Current project set:", projectList.getProjectById(id));
}


function createProject(title) {
    // Calculate the ID based on the current number of projects in projectList
    const id = projectList.projects.length + 1;

    // Create a new project instance
    const newProject = new Project(id, title);
    
    // Add the project to the project list
    projectList.addProject(newProject);

    setCurrentProject(id);
}


function removeProject(id) {
    const projectToRemove = projectList.getProjectById(id);

    if (!projectToRemove) {
        console.error(`Project with ID ${id} not found.`);
        return;
    }

    // Remove the project from projectList
    projectList.removeProject(id);

    console.log(`Project removed: ${projectToRemove.title} (ID: ${id})`);
}


// Function to log projectList and its contents
function logProjectList() {
    console.log("Project List:", projectList.projects);
}

export {
    projectList, loadDefaults, setCurrentProject,
    createProject, removeProject, logProjectList
};