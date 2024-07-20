import "./normalize.css";
import "./styles.css";
import { loadDashboard } from "./Dashboard/Dashboard";
import { loadMainContent } from "./MainContent/MainContent";

document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    loadMainContent();
    // loadHeader();
    // loadRightSidebar();
    // loadFooter();
});


// TO DO:
// - Make "completed", "due date" and "important" buttons functional.
// - Add memory using the Web Storage API.
// - Add task details, notes, subtasks, etc to the right-sidebar.
// - Consider moving ProjectManager.js functions into class methods.

// - Replace input fields with editable divs.
// - Add real links to the Dashboard (Important, Tasks, Calendar, etc). 
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
// - Add "drag and drop" functionality to projects and tasks.
// - Optional: When creating a new project, focus on empty input field to rename.
// - Create a Support page with a contact form.
// - Create rudimentary Privacy agreement.
// - Change Fonts.
// - Create Footer.
// - Add Favicon.