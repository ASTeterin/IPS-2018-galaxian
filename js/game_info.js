import {WIN} from './config.js';

function showInfo(gameResult) {
    const infoWindow = (gameResult == WIN)? document.getElementById('winModal'): document.getElementById('looseModal');
    infoWindow.style.display = 'block';
}

export {showInfo};
