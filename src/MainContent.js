import { projectList, loadDefaults, setCurrentProject, createProject, logProjectList } from "./ProjectManager";
import { createTask } from "./TaskManager";


function loadMainContent() {
    loadDefaults();
    console.log("Main content loaded with defaults");
    createTask('A', 'Laundry', 1);
    createTask('B', 'water the vineyard', 2);
    createProject('Farming');
    logProjectList();
    setCurrentProject(2);
    logProjectList();
}


export { loadMainContent };