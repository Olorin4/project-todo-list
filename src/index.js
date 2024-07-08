import "./normalize.css";
import './styles.css';
import { loadMainContent } from './MainContent';

document.addEventListener('DOMContentLoaded', () => {
    loadMainContent();
});






// TO DO:
// - Add "delete project" button, visible only when project is hovered
// - Add "create task" functionality.
// - Add "completed", "delete task" and "important" buttons to the task card.
// - Move "add project" button to the end of the project-list div.
// - Add calendar.
// - Add memory.