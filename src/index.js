import './normalize.css';
import './styles.css';
import { loadTasks } from './MainContent';

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});