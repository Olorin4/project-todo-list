// Dashboard.js handles UI logic of the dashboard section.

import { renderDefaultProjects, logProjectList } from "./ProjectRenderer";


export function loadDashboard() {
    renderDefaultProjects();
    console.log("Main content loaded with defaults");



    // Experimental:
    
    
    // Debugging:
    logProjectList();
}