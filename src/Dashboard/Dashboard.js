// Dashboard.js initializes the UI of the Dashboard section.
import './Dashboard.css';
import { initializeProjectList } from "./ProjectManager";
import { renderProjects, setupAddProjectButton } from "./ProjectRenderer";


export function loadDashboard() {
    initializeProjectList();
    setupAddProjectButton();
    renderProjects();
}