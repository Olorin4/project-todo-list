import TabInitializer from './TabManager';
import { Project } from './Project';

function loadMainContent() {
    const projectButtons = document.querySelectorAll('.project');
    const projectElements = document.querySelectorAll('.task-list');
    const tabInitializer = new TabInitializer();

    tabInitializer.initTabs(projectButtons, projectElements);

    const addProjectButton = document.querySelector('.add-project');
    addProjectButton.addEventListener('click', () => {
        const projectList = document.querySelector('.project-list');
        const newProjectId = `tab-${tabInitializer.projectCount + 1}`;
        const newProjectButton = document.createElement('button');
        newProjectButton.classList.add('project');
        newProjectButton.dataset.project = tabInitializer.projectCount + 1;

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = `Project ${tabInitializer.projectCount + 1}`;
        inputField.classList.add('project-input');

        newProjectButton.appendChild(inputField);
        projectList.insertBefore(newProjectButton, addProjectButton);

        const newProjectElement = document.createElement('div');
        newProjectElement.classList.add('task-list');
        newProjectElement.id = newProjectId;
        document.querySelector('.task-list-container').appendChild(newProjectElement);

        tabInitializer.projectCount += 1;
        tabInitializer.initTabs(document.querySelectorAll('.project'), document.querySelectorAll('.task-list'));

        newProjectButton.addEventListener('dblclick', () => {
            inputField.style.display = 'inline';
            inputField.focus();
            newProjectButton.textContent = ''; // Clear the button text content
        });

        inputField.addEventListener('blur', () => {
            newProjectButton.textContent = inputField.value;
            inputField.style.display = 'none';
        });

        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                newProjectButton.textContent = inputField.value;
                inputField.style.display = 'none';
            }
        });
    });

    projectButtons.forEach(button => {
        const inputField = button.querySelector('input');

        button.addEventListener('dblclick', () => {
            inputField.style.display = 'inline';
            inputField.focus();
            button.textContent = ''; // Clear the button text content
        });

        inputField.addEventListener('blur', () => {
            button.textContent = inputField.value;
            inputField.style.display = 'none';
        });

        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                button.textContent = inputField.value;
                inputField.style.display = 'none';
            }
        });
    });
}

export { loadMainContent };