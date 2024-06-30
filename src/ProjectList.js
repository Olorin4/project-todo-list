import Card from './Card';

class ProjectList {
    constructor(id, projects) {
        this.id = id;
        this.projects = projects;
        this.listElement = document.getElementById(id);
        this.loadProjects();
    }

    loadProjects() {
        this.projects.forEach(project => {
            const card = new Card(project.title, project.description);
            this.listElement.appendChild(card.getElement());
        });
    }
}

export default ProjectList;