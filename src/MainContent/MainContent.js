// MainContent.js initializes the UI of the Main-content section.
import "./MainContent.css";
import { renderCurrentProject, setupAddTask } from "./TaskRenderer";


export function loadMainContent() {
    renderCurrentProject();
    setupAddTask();
}