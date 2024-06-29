import starIcon from './assets/star-plus-outline.svg';
import eyeIcon from './assets/eye-plus-outline.svg';
import forkIcon from './assets/source-fork.svg';

function createCard(title, description) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardTitle = document.createElement('h4');
    cardTitle.textContent = title;
    card.appendChild(cardTitle);

    const cardDescription = document.createElement('p');
    cardDescription.textContent = description;
    card.appendChild(cardDescription);

    const links = document.createElement('div');
    links.classList.add('links');

    const starLink = document.createElement('a');
    starLink.href = '#';
    const starImg = document.createElement('img');
    starImg.classList.add('star-icon');
    starImg.src = starIcon;
    starImg.alt = 'add-to-favorites';
    starLink.appendChild(starImg);
    links.appendChild(starLink);

    const eyeLink = document.createElement('a');
    eyeLink.href = '#';
    const eyeImg = document.createElement('img');
    eyeImg.classList.add('eye-plus-icon');
    eyeImg.src = eyeIcon;
    eyeImg.alt = 'add-to-watch-later';
    eyeLink.appendChild(eyeImg);
    links.appendChild(eyeLink);

    const forkLink = document.createElement('a');
    forkLink.href = '#';
    const forkImg = document.createElement('img');
    forkImg.classList.add('fork-icon');
    forkImg.src = forkIcon;
    forkImg.alt = 'fork';
    forkLink.appendChild(forkImg);
    links.appendChild(forkLink);

    card.appendChild(links);

    return card;
}

function loadMainContent() {
    const projectLists = [
        { id: 'tab-1', projects: [
            { title: 'Project 1A', description: 'Description for Project 1A' },
            { title: 'Project 1B', description: 'Description for Project 1B' }
        ]},
        { id: 'tab-2', projects: [
            { title: 'Project 2A', description: 'Description for Project 2A' },
            { title: 'Project 2B', description: 'Description for Project 2B' }
        ]},
        { id: 'tab-3', projects: [
            { title: 'Project 3A', description: 'Description for Project 3A' },
            { title: 'Project 3B', description: 'Description for Project 3B' }
        ]}
    ];

    projectLists.forEach(list => {
        const tabContent = document.getElementById(list.id);
        list.projects.forEach(project => {
            const card = createCard(project.title, project.description);
            tabContent.appendChild(card);
        });
    });

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabId = e.target.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById(`tab-${tabId}`).style.display = 'block';
        });
    });

    document.getElementById('tab-1').style.display = 'block'; // Show the first tab by default
}

export { loadMainContent };