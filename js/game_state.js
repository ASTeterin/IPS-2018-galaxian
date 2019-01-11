import {showInfo} from './game_info.js';
import {STOP, WIN, LOOSE} from './config.js';
import {postRequest} from './request.js';

function isLoose(gameContext) {
    let isEndGame = false;

    if (gameContext.ship.lifes <= 0) {
        isEndGame = true;
    }
    return isEndGame;
}

function isWin(gameContext) {
    let isEndGame = false;
    if (gameContext.advEnemy.lifes <= 0) {
        isEndGame = true;
    }
    return isEndGame;
}

function saveScores(score) {
    const data = {'score': score};
    postRequest('./inc/result.inc.php', data);
}

function checkGameState(gameContext, gameState, ship) {
    if (isLoose(gameContext)) {
        gameState = STOP;
        showInfo(LOOSE);
    }
    if (isWin(gameContext)) {
        saveScores(gameContext.ship.scores);
        gameState = STOP;
        showInfo(WIN);
    }

    return gameState;
}

export {checkGameState};
