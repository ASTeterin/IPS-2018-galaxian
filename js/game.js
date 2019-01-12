import {redraw} from './draw.js';
import {updateAdvancedEnemys, setAdvancedEnemyParam, createEnemys, updateEnemys, createNewAdvEnemy} from './enemy.js';
import {moveBullets, createNewShoot} from './bullets.js';
import {STOP, LEFT, RIGHT} from './config.js';
import {moveShip, myShipConflictHandling} from './ship.js';
import {updateRockets} from './rocket.js';
import {updateStars} from './star.js';
import {keyPressHendler} from './keyPressHendler.js';
import {GameContext} from './gameContext.js';
import {updateGarbage} from './garbage.js';
import {checkGameState} from './game_state.js';


const MY_BULLET_DIRECTION = -1;
const ENEMY_BULLET_DIRECTION = 1;

function KeyPressedFlag({
    left,
    right,
    shoot,
    rocketShoot,
    stop,
}) {
    this.left = left;
    this.right = right;
    this.shoot = shoot;
    this.rocketShoot = rocketShoot;
    this.stop = stop;
}

function update({gameContext, deltaTime}) {
    moveShip({ship: gameContext.ship, deltaTime});
    moveBullets({bullets: gameContext.bullets, deltaTime, direction: MY_BULLET_DIRECTION});
    updateGarbage(gameContext.garbage, deltaTime, gameContext.bullets);
    updateAdvancedEnemys({advEnemy: gameContext.advEnemy, deltaTime, ship: gameContext.ship, bullets: gameContext.bullets, enemyBullets: gameContext.enemyBullets, rockets: gameContext.rockets});
    updateEnemys({enemys: gameContext.enemys, deltaTime, bullets: gameContext.bullets, rockets: gameContext.rockets, enemyBullets: gameContext.enemyBullets, ship: gameContext.ship});
    moveBullets({bullets: gameContext.enemyBullets, deltaTime, direction: ENEMY_BULLET_DIRECTION});
    updateRockets({rockets: gameContext.rockets, deltaTime});
    myShipConflictHandling({ship: gameContext.ship, enemyBullets: gameContext.enemyBullets, garbage: gameContext.garbage});
    updateStars({stars: gameContext.stars, deltaTime});
}


function modalWindowProcessing(keyPressedFlag, gameState) {
    const stayInGameButton = document.getElementById('stay_in_game_bnt');
    const beginPlayButton = document.getElementById('begin_play_bnt');
    stayInGameButton.addEventListener('click', function() {
        document.getElementById('exitModal').style.display = 'none';
        keyPressedFlag.stop = false;
    });

    beginPlayButton.addEventListener('click', function() {
        document.getElementById('about_game_modal').style.display = 'none';
        keyPressedFlag.stop = false;
    });
}


function processEvents(keyPressedFlag, gameContext) {
    if ((keyPressedFlag.left) && (!keyPressedFlag.right)) {
        gameContext.ship.direction = LEFT;
    }
    if ((keyPressedFlag.right) && (!keyPressedFlag.left)) {
        gameContext.ship.direction = RIGHT;
    }
    if ((!keyPressedFlag.left) && (!keyPressedFlag.right)) {
        gameContext.ship.direction = 0;
    }
    if ((keyPressedFlag.shoot) && (gameContext.ship.canShoot)) {
        document.getElementById('shoot').play();
        createNewShoot(gameContext.bullets, gameContext.ship);
        gameContext.ship.canShoot = false;
    }
    if ((!keyPressedFlag.shoot) && (!keyPressedFlag.rocketShoot)) {
        gameContext.ship.canShoot = true;
    }
    if ((keyPressedFlag.rocketShoot) && (gameContext.ship.canShoot)) {
        document.getElementById('shoot').play();
        createNewShoot(gameContext.rockets, gameContext.ship);
        gameContext.ship.countRockets--;
        gameContext.ship.canShoot = false;
    }
}


function main() {
    const canvasEl = document.getElementById('canvas');
    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    const advEnemyPosition = 0;
    const advEnemyDirection = 0;
    let gameContext = null;

    setAdvancedEnemyParam({advEnemyPosition, advEnemyDirection});
    gameContext = new GameContext(width, height, advEnemyPosition);
    const keyPressedFlag = new KeyPressedFlag({
        left: false,
        right: false,
        shoot: false,
        rocketShoot: false,
        stop: true,
    });
   
    keyPressHendler(keyPressedFlag, gameContext);
    modalWindowProcessing(keyPressedFlag, gameContext.gameState);

    let lastTimestamp = Date.now(); //текущее время в ms
    if (!((keyPressedFlag.stop) || (gameContext.gameState == STOP))) {
        return;
    }

    //canvas.addEventListener('click', () => {
        
    //}, false);
    
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра

        if (gameContext.enemys.length == 0) {
            createEnemys(gameContext.enemys);
        }
        createNewAdvEnemy(gameContext.advEnemy);
        lastTimestamp = currentTimeStamp;
        if (!keyPressedFlag.stop) {
            processEvents(keyPressedFlag, gameContext);
            update({gameContext, deltaTime});
            redraw({ctx, gameContext, width, height});
        }

        gameContext.gameState = checkGameState(gameContext, gameContext.gameState);
        if (gameContext.gameState != STOP) {
            requestAnimationFrame(animateFn);
        }
    };
    animateFn();
}

main();

