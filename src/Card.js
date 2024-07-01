import { IconLinkManager } from './LinkFactory';

class Card {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.cardElement = this.createCard();
    }

    createCard() {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardTitle = document.createElement('h4');
        cardTitle.textContent = this.title;
        card.appendChild(cardTitle);

        const cardDescription = document.createElement('p');
        cardDescription.textContent = this.description;
        card.appendChild(cardDescription);

        const links = document.createElement('div');
        links.classList.add('links');
        card.appendChild(links);

        // Use LinkFactory to create the links
        const starLink = IconLinkManager.createStarLink();
        const eyeLink = IconLinkManager.createEyeLink();
        const forkLink = IconLinkManager.createForkLink();
        links.appendChild(starLink);
        links.appendChild(eyeLink);
        links.appendChild(forkLink);

        return card;
    }

    getElement() {
        return this.cardElement;
    }
}

export default Card;