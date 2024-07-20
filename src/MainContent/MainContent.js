// MainContent.js handles all DOM manipulation of the main-content section.
import { projectList, setCurrentProject } from "../Dashboard/ProjectManager";
import { renderCurrentProject } from "../Dashboard/ProjectRenderer";
import { createTask, removeTask, toggleCompletedStatus, logTaskList } from "./TaskManager";
import { setupAddTask } from "./TaskRenderer";


export function loadMainContent() {
    setupAddTask()




    // Debugging:
    createTask((projectList.currentProject.taskCount+1), "Example Task 1");
    // setCurrentProject(2);
    // createTask((projectList.currentProject.taskCount+1), "Example Task 2");
    // setCurrentProject(3);
    // createTask((projectList.currentProject.taskCount+1), "Example Task 3");
    // createTask((projectList.currentProject.taskCount+1), "Example Task 4");
    // removeTask(projectList.currentProject.taskCount, 3);
    // setCurrentProject(1);
    renderCurrentProject();
    toggleCompletedStatus(1)

    logTaskList();
}