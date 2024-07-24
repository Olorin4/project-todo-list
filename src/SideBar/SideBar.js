// SideBar.js initializes the UI of the SideBar section.
import './SideBar.css';
import { renderCurrentTask } from './SidebarRenderer';


export function loadSideBar() {
    renderCurrentTask();
}