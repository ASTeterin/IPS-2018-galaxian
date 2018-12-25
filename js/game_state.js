import {showInfo} from './game_info.js';
import {STOP, WIN, LOOSE} from './config.js';

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

function checkGameState(gameObjects, gameState) {
    if (isLoose(gameObjects)) {
        gameState = STOP;
        showInfo(LOOSE);
    }
    if (isWin(gameObjects)) {
        gameState = STOP;
        showInfo(WIN);
    }
    return gameState;
}

export {checkGameState};
