// MainContent.js handles UI logic of the main-content section.

import { Task } from "./Objects";
import { projectList, loadDefaults, setCurrentProject,
        createProject, removeProject, logProjectList } from "./ProjectManager";
import { createTask, removeTask } from "./TaskManager";


function loadMainContent() {
    loadDefaults();
    console.log("Main content loaded with defaults");

    // Experimental:
    
    
    // Debugging:
    // Create a new Task instance
    const myTask = createTask("Example Task", 1);

    // Mark the task as important
    myTask.markImportant();
    
    myTask.complete()

    myTask.markUnimportant()

    // Log the task to see the updated important status
    console.log(myTask);



    logProjectList();
}


export { loadMainContent };