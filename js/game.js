import {redraw} from './draw.js';
import {updateAdvancedEnemys, getAdvancedEnemyParam, createEnemys, updateEnemys, createNewAdvEnemy} from './enemy.js';
import {moveBullets, createNewShoot} from './bullets.js';
import {SHIP_PARAMS, LEFT, RIGHT} from './config.js';
import {moveShip, myShipConflictHandling} from './ship.js';
import {updateRockets} from './rocket.js';
import {createStars, updateStars} from './star.js';
import {keyPressHendler} from './keyPressHendler.js';
import {GameObjects} from './gameObjects.js';
import {updateGarbage} from './garbage.js';


const MY_BULLET_DIRECTION = -1;
const ENEMY_BULLET_DIRECTION = 1;


function KeyPressedFlag({
    left,
    right,
    shoot,
    rocketShoot,
    exit,
}) {
    this.left = left;
    this.right = right;
    this.shoot = shoot;
    this.rocketShoot = rocketShoot;
    this.exit = exit;
}

function update({gameObjects, deltaTime}) {
    moveShip({ship: gameObjects.ship, deltaTime});
    moveBullets({bullets: gameObjects.bullets, deltaTime, direction: MY_BULLET_DIRECTION});
    updateGarbage(gameObjects.garbage, deltaTime, gameObjects.bullets);
    updateAdvancedEnemys({advEnemy: gameObjects.advEnemy, deltaTime, ship: gameObjects.ship, bullets: gameObjects.bullets, enemyBullets: gameObjects.enemyBullets, rockets: gameObjects.rockets});
    updateEnemys({enemys: gameObjects.enemys, deltaTime, bullets: gameObjects.bullets, rockets: gameObjects.rockets, enemyBullets: gameObjects.enemyBullets, ship: gameObjects.ship});
    moveBullets({bullets: gameObjects.enemyBullets, deltaTime, direction: ENEMY_BULLET_DIRECTION});
    updateRockets({rockets: gameObjects.rockets, deltaTime});
    myShipConflictHandling({ship: gameObjects.ship, enemyBullets: gameObjects.enemyBullets, garbage: gameObjects.garbage});
    updateStars({stars: gameObjects.stars, deltaTime});
}


function modalWindowProcessing(keyPressedFlag) {
    //const exitButton = document.getElementById('exitGameBnt');
    const stayInGameButton = document.getElementById('stayInGameBnt');
    const beginPlayButton = document.getElementById('begin_play_bnt');
    stayInGameButton.addEventListener('click', function() {
        document.getElementById('exitModal').style.display = 'none';
        keyPressedFlag.exit = false;
    });

    beginPlayButton.addEventListener('click', function() {
        document.getElementById('about_game_modal').style.display = 'none';
        keyPressedFlag.exit = false;
    });
}


function processEvents(keyPressedFlag, gameObjects) {
    if ((keyPressedFlag.left) && (!keyPressedFlag.right)) {
        gameObjects.ship.direction = LEFT;
    }
    if ((keyPressedFlag.right) && (!keyPressedFlag.left)) {
        gameObjects.ship.direction = RIGHT;
    }
    if ((!keyPressedFlag.left) && (!keyPressedFlag.right)) {
        gameObjects.ship.direction = 0;
    }
    if ((keyPressedFlag.shoot) && (gameObjects.ship.canShoot)) {
        createNewShoot(gameObjects.bullets, gameObjects.ship);
        gameObjects.ship.canShoot = false;
    }
    if ((!keyPressedFlag.shoot) && (!keyPressedFlag.rocketShoot)) {
        gameObjects.ship.canShoot = true;
    }
    if ((keyPressedFlag.rocketShoot) && (gameObjects.ship.canShoot)) {
        createNewShoot(gameObjects.rockets, gameObjects.ship);
        gameObjects.ship.canShoot = false;
    }
}


function main() {
    const canvasEl = document.getElementById('canvas');
    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    const advEnemyPosition = 0;
    const advEnemyDirection = 0;
    let gameObjects = null;


    getAdvancedEnemyParam({advEnemyPosition, advEnemyDirection});
    gameObjects = new GameObjects(width, height, advEnemyPosition);
    const keyPressedFlag = new KeyPressedFlag({
        left: false,
        right: false,
        shoot: false,
        rocketShoot: false,
        exit: true,
    });
    createStars(gameObjects.stars);
    keyPressHendler(keyPressedFlag, gameObjects);


    modalWindowProcessing(keyPressedFlag);

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра

        if (gameObjects.enemys.length == 0) {
            createEnemys(gameObjects.enemys);
        }
        createNewAdvEnemy(gameObjects.advEnemy);

        lastTimestamp = currentTimeStamp;

        if (!keyPressedFlag.exit) {
            processEvents(keyPressedFlag, gameObjects);
            update({gameObjects, deltaTime});
            redraw({ctx, gameObjects, width, height});
        }
        if (gameObjects.ship.health == 0) {
            if (gameObjects.ship.lifes == 0) {
                alert('GAME OVER');
                return 0;
            } else {
                gameObjects.ship.lifes--;
                gameObjects.ship.health = SHIP_PARAMS.BEGIN_HEALTH_STATE;
            }
        }
        requestAnimationFrame(animateFn);
    };
    animateFn();
}

main();

