// MainContent.js handles all DOM interactions of the main-content section.

import { TaskCard } from "./Objects";
import {
    projectList, loadDefaults, setCurrentProject,
    createProject, removeProject, logProjectList
} from "./ProjectManager";
import { createTask, removeTask } from "./TaskManager";


function loadMainContent() {
    loadDefaults();
    console.log("Main content loaded with defaults");


    const task = new Task(1, "Example Task", 1);
    const taskCard = new TaskCard(task);
    document.body.appendChild(taskCard.element);
    
    // Debugging:
    createTask('Laundry', 1);
    createTask('Shopping', 1);
    createTask('water the vineyard', 2);
    createProject('Farming');
    logProjectList();
    setCurrentProject(2);
    logProjectList();
    removeTask(1, 1);
    removeProject(2)
    logProjectList();
}


export { loadMainContent };