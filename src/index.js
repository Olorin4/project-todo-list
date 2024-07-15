import "./normalize.css";
import "./styles.css";
import { loadMainContent } from "./MainContent";

document.addEventListener('DOMContentLoaded', () => {
    loadMainContent();
    // loadDashboard();
    // loadHeader();
    // loadRightSidebar();
    // loadFooter();
});



// TO DO:
// - Make ***add-project*** and add-task buttons functional.
// - Add "delete project" button, visible only when project is hovered.
// - Add "completed", "delete task" and "important" buttons to the task card.
// - Move "add project" button to the end of the project-list div.
// - Copy title of current Project to main content header.
// - Add memory using the Web Storage API.
// - Add real links to the Dashboard (Important, Tasks, Calendar, etc). 
// - Add task details, notes, subtasks, etc to the right-sidebar.
// - Add calendar to right-sidebar.
// - Add links Today, Tomorrow and My Week to the Dashboard.
// - Add ability to move tasks to different projects.
// - Add Date and Greeting to header.
// - Add customizable User avatar and name.
// - Add notifications (due date tasks).
// - Add Team functionality.
// - Make Search functional.
// - Add tag colors to task card.
// - Add a 15 project cap.
// - Optional: Move Project list to the Dashboard.
// - Create a Support page with a contact form.
// - Create rudimentary Privacy agreement.
// - Change Fonts.
// - Create Footer.