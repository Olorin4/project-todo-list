// Dashboard.js handles UI logic of the main-content section.

import { setupAddProjectButton, setupDeleteProjectButton,
        renderDefaultProjects } from "./ProjectRenderer";
import { logProjectList } from "./ProjectManager";


function loadDashboard() {
    setupAddProjectButton()
    setupDeleteProjectButton()
    renderDefaultProjects();
    console.log("Main content loaded with defaults");

    
    




    // Experimental:
    
    
    // Debugging:
    logProjectList();
}


export { loadDashboard };