import {showInfo} from './game_info.js';
import {STOP, WIN, LOOSE} from './config.js';
import {postRequest} from './request.js';

function isLoose(gameObjects) {
    let isEndGame = false;

    if (gameObjects.ship.lifes <= 0) {
        isEndGame = true;
    }
    return isEndGame;
}

function isWin(gameObjects) {
    let isEndGame = false;
    if (gameObjects.advEnemy.lifes <= 0) {
        isEndGame = true;
    }
    return isEndGame;
}

function saveScores(score) {
    const data = {'score': score};
    postRequest('./inc/result.inc.php', data);
}

function checkGameState(gameObjects, gameState, ship) {
    if (isLoose(gameObjects)) {
        gameState = STOP;
        showInfo(LOOSE);
    }
    if (isWin(gameObjects)) {
        saveScores(gameObjects.ship.scores);
        gameState = STOP;
        showInfo(WIN);
    }

    return gameState;
}

export {checkGameState};
