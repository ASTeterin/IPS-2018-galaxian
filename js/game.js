import { redraw } from './draw.js';
import {AdvancedEnemy, updateAdvancedEnemys, getAdvancedEnemyParam, createEnemys, updateEnemys, createNewAdvEnemy} from './enemy.js';
import {Bullet, moveBullets, createNewShoot} from './bullets.js';
import {SHIP_PARAMS, WIDTH, LEFT, RIGHT, ADV_ENEMY_SHOOTING_TIME, ADV_ENEMY_LINE, HEIGHT} from './config.js';
import {createShip, moveShip, myShipConflictHandling, getShipDirection} from './ship.js';
import {updateRockets} from './rocket.js';
import {createStars, updateStars} from './star.js';
import {keyPressHendler} from './keyPressHendler.js';

import {Garbage, updateGarbage} from './garbage.js';



const MY_BULLET_DIRECTION = -1;
const ENEMY_BULLET_DIRECTION = 1;


const ADV_ENEMY_HEALTH = 5;
const ADV_ENEMY_LIFES = 3;


function KeyPressedFlag({
    left,
    right,
    shoot,
    rocketShoot,
    exit
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
    updateRockets({rockets: gameObjects.rockets, deltaTime})
    myShipConflictHandling({ship: gameObjects.ship, enemyBullets: gameObjects.enemyBullets, garbage: gameObjects.garbage});
    updateStars({stars: gameObjects.stars, deltaTime});
}


function modalWindowProcessing(keyPressedFlag) {
    const exitButton = document.getElementById("exitGameBnt");
    const stayInGameButton = document.getElementById("stayInGameBnt");
    const beginPlayButton = document.getElementById("begin_play_bnt");
    stayInGameButton.addEventListener('click', function() {
        document.getElementById('exitModal').style.display = 'none';
        keyPressedFlag.exit = false;
    });

    beginPlayButton.addEventListener('click', function() {
        document.getElementById('about_game_modal').style.display = 'none';
        keyPressedFlag.exit = false;  
    });
} 



function createAdvEnemy(advEnemyPosition)
{
    return new AdvancedEnemy({
        startX: advEnemyPosition, 
        startY: ADV_ENEMY_LINE, 
        direction: RIGHT, 
        health: ADV_ENEMY_HEALTH, 
        shootingTime: ADV_ENEMY_SHOOTING_TIME, 
        isShooting: false, 
        lifes: ADV_ENEMY_LIFES
    });
}


function GameObjects( width, height, advEnemyPosition)
{
    this.ship = createShip(width, height);
    this.advEnemy = createAdvEnemy(advEnemyPosition);
    this.bullets = [];
    this.rockets = [];
    this.enemys = [];
    this.enemyBullets = [];
    this.garbage = new Garbage({});
    this.stars = [];
}
/*
function flagsHendler(keyPressedFlag, gameObjects, bullets)
{
    if ((keyPressedFlag.left) && (!keyPressedFlag.right)) {
        gameObjects.ship.direction = LEFT;
        //keyPressedFlag.left = false;
        //return;
    }
    if ((keyPressedFlag.right) && (!keyPressedFlag.left)) {
        gameObjects.ship.direction = RIGHT;
        //keyPressedFlag.right = false;
        //return;
    }
    if ((!keyPressedFlag.left) && (!keyPressedFlag.right)) {
        gameObjects.ship.direction = 0;
    }
    if (keyPressedFlag.shoot) {
        setTimeout(createNewShoot(bullets, gameObjects.ship), 5000);
        keyPressedFlag.shoot = false;
        return;
    }
    if (keyPressedFlag.rocketShoot) {
        createNewShoot(gameObjects.rockets, gameObjects.ship);
        keyPressedFlag.rocketShoot = false;
        return;
    }
}
*/


function main() {
    const canvasEl = document.getElementById("canvas");
    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    let advEnemyPosition = 0;
    let advEnemyDirection = 0;
    //let stars = [];
    let gameObjects = null;
    
    
    getAdvancedEnemyParam({advEnemyPosition, advEnemyDirection});
    gameObjects = new GameObjects(width, height, advEnemyPosition);
    let keyPressedFlag = new KeyPressedFlag({
        left: false,    
        right: false,
        shoot: false,
        rocketShoot: false,
        exit: true
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
        gameObjects.ship.direction = getShipDirection(keyPressedFlag); 
        
        if (!keyPressedFlag.exit) {
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
    }
    animateFn();
}

main();

