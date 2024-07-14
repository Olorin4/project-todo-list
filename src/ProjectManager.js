// ProjectManager.js handles tab management (initialization and switching).

import { ProjectList, Project } from "./Objects";

const projectList = new ProjectList();

function loadDefaults() {
    const defaultProjects = [
        new Project(1, "Personal"),
        new Project(2, "Work"),
        new Project(3, "Grocery List"),
    ];

    console.log("Default projects created:", defaultProjects);

    // Add default projects to the projects object
    defaultProjects.forEach(project => {
        projectList.addProject(project);
    });

    console.log("Projects after adding defaults:", projectList.projects);

    // Set the first project as current by default
    setCurrentProject(defaultProjects[0].id);
}


function setCurrentProject(id) {
    console.log(`Setting project ${id} as current`);

    // Unset current-project status for all projects in the projects object
    projectList.projects.forEach(proj => {
        proj.unsetCurrent();
    });

    // Set current-project status for the specified project
    projectList.getProjectById(id).setCurrent();

    console.log("Current project set:", projectList.getProjectById(id));
}


function createProject(id, title) {
    // Create a new project instance
    const newProject = new Project(id, title);
    
    // Add the project to the project list
    projectList.addProject(newProject);

    setCurrentProject(id);
}


export { loadDefaults, setCurrentProject, createProject };