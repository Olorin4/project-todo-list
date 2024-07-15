// MainContent.js handles UI logic of the main-content section.

import { projectList, Project, Task } from "./Objects";
import { loadDefaults, setCurrentProject, createProject,
        removeProject, logProjectList } from "./ProjectManager";
import { createTask, removeTask } from "./TaskManager";

let projectCount = 3;


function renderDefaultProjects() {

}


(function setupAddProjectButton() {
    // add event listener for add-project button that creates
    // a new div under the project-list div, that contains the new project.

    const addButton = document.querySelector(".add-project").addEventListener("click", () => {
        projectCount++;
        createProject(`Project ${projectCount}`);
        logProjectList();
    });
})();





function loadMainContent() {
    loadDefaults();
    console.log("Main content loaded with defaults");

    renderDefaultProjects();




    // Experimental:
    
    
    // Debugging:
    logProjectList();
}


export { loadMainContent };