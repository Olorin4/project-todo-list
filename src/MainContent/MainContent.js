// MainContent.js handles all DOM manipulation of the main-content section.
import { projectList, setCurrentProject } from "../Dashboard/ProjectManager";
import { createTask, removeTask, logTaskList } from "./TaskManager";


export function loadMainContent() {




    // Debugging:
    createTask(1, "Example Task 1");
    setCurrentProject(2);
    createTask(2, "Example Task 2");
    setCurrentProject(3);
    createTask(3, "Example Task 3");
    createTask(4, "Example Task 4");
    removeTask(4, 3);

    logTaskList();
}