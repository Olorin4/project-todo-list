// Dashboard.js handles UI logic of the main-content section.

import { renderDefaultProjects, logProjectList } from "./ProjectRenderer";


function loadDashboard() {
    renderDefaultProjects();
    console.log("Main content loaded with defaults");



    // Experimental:
    
    
    // Debugging:
    logProjectList();
}


export { loadDashboard };

// function setupDeleteProjectButton() {
//     document.querySelectorAll(".delete-project").forEach((btn) => {
//         btn.addEventListener("click", (event) => {
//             // Find the nearest ancestor element with the class "project"
//             const projectTab = event.target.closest(".project");

//             // Extract the id from data-project-id
//             const projectId = parseInt(projectTab.dataset.projectId, 10);  //?
//             removeProject(projectId);
//             projectTab.remove();

//             projectCount--;
//             console.log(`projectCount is ${projectCount}`);

//             renderProject();
//             logProjectList();
//         });
//     });
// }