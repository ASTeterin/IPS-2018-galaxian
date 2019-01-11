import {WIN} from './config.js';

function showInfo(gameResult) {
    const infoWindow = (gameResult == WIN)? document.getElementById('win_modal'): document.getElementById('loose_modal');
    infoWindow.style.display = 'block';
}

export {showInfo};
