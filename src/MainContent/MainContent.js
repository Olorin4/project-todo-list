// MainContent.js handles all DOM manipulation of the main-content section.
import { projectList, setCurrentProject } from "../Dashboard/ProjectManager";
import { createTask, removeTask, toggleCompletedStatus, logTaskList } from "./TaskManager";
import { renderCurrentProject, setupAddTask } from "./TaskRenderer";


export function loadMainContent() {
    renderCurrentProject();
    setupAddTask();


    // Debugging:
    // console.log('Project List:', projectList);
    // console.log('Current Project:', projectList.currentProject);
    // createTask((projectList.currentProject.taskCount+1), "Example Task 1");
    // // setCurrentProject(2);
    // // createTask((projectList.currentProject.taskCount+1), "Example Task 2");
    // // setCurrentProject(3);
    // // createTask((projectList.currentProject.taskCount+1), "Example Task 3");
    // // createTask((projectList.currentProject.taskCount+1), "Example Task 4");
    // // removeTask(projectList.currentProject.taskCount, 3);
    // // setCurrentProject(1);
    // renderCurrentProject();

    // logTaskList();
}