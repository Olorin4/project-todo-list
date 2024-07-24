// MainContent.js initializes the UI of the Main-content section.
import "./MainContent.css";
import { projectList, setCurrentProject } from "../Dashboard/ProjectManager";
import { createTask, removeTask, toggleCompletedStatus } from "./TaskManager";
import { renderCurrentProject, setupAddTask } from "./TaskRenderer";


export function loadMainContent() {
    renderCurrentProject();
    setupAddTask();
}