// MainContent.js handles all DOM interactions of the main-content section.

import { projectList, loadDefaults, setCurrentProject, createProject, logProjectList } from "./ProjectManager";
import { createTask } from "./TaskManager";


function loadMainContent() {
    loadDefaults();
    console.log("Main content loaded with defaults");
    createTask('Laundry', 1);
    createTask('Shopping', 1);
    createTask('water the vineyard', 2);
    createProject('Farming');
    logProjectList();
    setCurrentProject(2);
    logProjectList();
}


export { loadMainContent };