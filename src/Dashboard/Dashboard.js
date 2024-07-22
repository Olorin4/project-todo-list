// Dashboard.js handles UI logic of the dashboard section.
import { initializeProjectList } from "./ProjectManager";
import { renderProjects, setupAddProjectButton } from "./ProjectRenderer";


export function loadDashboard() {
    setupAddProjectButton();
    initializeProjectList();
    renderProjects();

    // Experimental:
    
    // Debugging:

}