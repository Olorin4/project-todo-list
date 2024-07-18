import "./normalize.css";
import "./styles.css";
import { loadDashboard } from "./Dashboard";
import { loadMainContent } from "./MainContent";

document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    loadMainContent();
    // loadHeader();
    // loadRightSidebar();
    // loadFooter();
});


// TO DO:
// - Copy title of current Project to main content header.
// - Add Tasks to current Project.
// - Add "completed", "due date" and "important" buttons to the task card.
// - Add memory using the Web Storage API.
// - Fix delete.svg issue.

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
// - Optional: When creating a new project, focus on empty input field to rename.
// - Create a Support page with a contact form.
// - Create rudimentary Privacy agreement.
// - Change Fonts.
// - Create Footer.