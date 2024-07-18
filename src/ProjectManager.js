import { ProjectList, Project } from "./Objects";


const projectList = new ProjectList();


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
    if (id === null) { console.log("No current project set."); return; }

    let project = projectList.getProjectById(id);

    if (!project) {console.error(`Project with ID ${id} not found.`); return; }
    if (project.isCurrent) { return; }

    // Unset current-project status for all projects in the projectList object
    projectList.projects.forEach(proj => {
        proj.unsetCurrent();
    });

    // Set current-project status for the specified project
    project.setCurrent();

    console.log("Current project set:", project);
}


function createProject(id, title) {
    const newProject = new Project(id, title);
    projectList.addProject(newProject);

    console.log(`Project with ID ${id} created.`);

    setCurrentProject(id);
}


function removeProject(id) {
    const projectToRemove = projectList.getProjectById(id);
    const wasCurrent = projectToRemove.isCurrent;

    // Remove the project from projectList
    projectList.removeProject(id);
    
    console.log(`Project removed: ${projectToRemove.title} (ID: ${id})`);

    if (wasCurrent) {
        setCurrentProject(id);
    } 
}
    

// Function to log projectList and its contents
function logProjectList() {
    console.log("Project List:", projectList.projects);
}

export {
    projectList, loadDefaults, setCurrentProject,
    createProject, removeProject, logProjectList
};