import starIcon from './assets/star-plus-outline.svg';
import eyeIcon from './assets/eye-plus-outline.svg';
import forkIcon from './assets/source-fork.svg';

class LinkCreator {
    static createLink(iconSrc, altText) {
        const link = document.createElement('a');
        link.href = '#';  // placeholder link

        const iconImg = document.createElement('img');
        iconImg.src = iconSrc;
        iconImg.alt = altText;

        link.appendChild(iconImg);
        return link;
    }
}

class IconLinkManager {
    static createStarLink() {
        return LinkCreator.createLink(starIcon, 'add-to-important');
    }

    static createEyeLink() {
        return LinkCreator.createLink(eyeIcon, 'add-to-watch-later');
    }

    static createForkLink() {
        return LinkCreator.createLink(forkIcon, 'fork');
    }
}

export { IconLinkManager };