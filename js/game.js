import { redraw } from './draw.js';
import {AdvancedEnemy, updateAdvancedEnemys, getAdvancedEnemyParam, createEnemys, updateEnemys, createNewAdvEnemy} from './enemy.js';
import {Bullet, moveBullets} from './bullets.js';
import {SHIP_PARAMS, WIDTH, LEFT, RIGHT, ADV_ENEMY_SHOOTING_TIME, ADV_ENEMY_LINE, HEIGHT} from './config.js';
import {createShip, moveShip, myShipConflictHandling} from './ship.js';
import {updateRockets} from './rocket.js';
import {createStars, updateStars} from './star.js';
import {KEY_CODES} from './config.js';
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

function update({ship, deltaTime, bullets, stars, enemys, enemyBullets, rockets, advEnemy, garbage}) {
    moveShip({ship, deltaTime});
    moveBullets({bullets: bullets, deltaTime, direction: MY_BULLET_DIRECTION});
    updateGarbage(garbage, deltaTime, bullets);
    updateAdvancedEnemys({advEnemy, deltaTime, ship, bullets, enemyBullets, rockets});
    updateEnemys({enemys, deltaTime, bullets, rockets, enemyBullets, ship});
    moveBullets({bullets: enemyBullets, deltaTime, direction: ENEMY_BULLET_DIRECTION});
    updateRockets({rockets, deltaTime})
    myShipConflictHandling({ship, enemyBullets, garbage});
    updateStars({stars, deltaTime});
}


function getDirection(current_direction)
{
    if ((current_direction.left) && (!current_direction.right)) {
        return LEFT;
    }
    if ((current_direction.right) && (!current_direction.left)) {
        return RIGHT;
    }
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

function createNewRocketShoot(rockets, ship)
{
    rockets.push(new Bullet({
        startX: ship.x + SHIP_PARAMS.MY_SHIP_SIZE / 2, 
        startY: ship.y - SHIP_PARAMS.MY_SHIP_SIZE * Math.cos(Math.PI / 3)
    }));
    return rockets;
}

function GameObjects( width, height, advEnemyPosition)
{
    this.ship = createShip(width, height);
    this.advEnemy = createAdvEnemy(advEnemyPosition);
    this.rockets = [];
    this.garbage = new Garbage({});
    //this.stars = 
}

function keyPressHendler(keyPressedFlag, bullets, rockets, gameObjects)
{
    document.addEventListener("keydown", (event) => {
        if (event.keyCode == KEY_CODES.KEY_CODE_LEFT) {
            keyPressedFlag.left = true;
        }
        if ((event.keyCode == KEY_CODES.KEY_CODE_RIGHT)) {
            keyPressedFlag.right = true;
        }
        if ((event.keyCode == KEY_CODES.KEY_CODE_SHOOT) && (!keyPressedFlag.shoot)) {
            keyPressedFlag.shoot = true;
            bullets.push(new Bullet({
                startX: gameObjects.ship.x + SHIP_PARAMS.MY_SHIP_SIZE / 2, 
                startY: gameObjects.ship.y - SHIP_PARAMS.MY_SHIP_SIZE * Math.cos(Math.PI / 3)
            }));
        }

        if ((event.keyCode == KEY_CODES.KEY_CODE_ROCKETSHOOT) && (!keyPressedFlag.rocketShoot)) {
            if (gameObjects.ship.countRockets) {
                keyPressedFlag.rocketShoot = true;
                gameObjects.rockets = createNewRocketShoot(gameObjects.rockets, gameObjects.ship);
                gameObjects.ship.countRockets--;
            }
        }

        if (event.keyCode == KEY_CODES.KEY_CODE_PAUSE) {
            
            var exitModalWindow = document.getElementById('exitModal');
            var display = window.getComputedStyle(exitModalWindow).display;
            if (display == 'none') { 
                exitModalWindow.style.display = 'block';
                keyPressedFlag.exit = true;
            } else {
                exitModalWindow.style.display = 'none';
                keyPressedFlag.exit = false;
            }
        }

    })

    document.addEventListener("keyup", (event) => {
        if (event.keyCode == KEY_CODES.KEY_CODE_LEFT) {
            keyPressedFlag.left = false;
        }
        if (event.keyCode == KEY_CODES.KEY_CODE_RIGHT) {
            keyPressedFlag.right = false;
        }
        if (event.keyCode == KEY_CODES.KEY_CODE_SHOOT) {
            keyPressedFlag.shoot = false;
        }
        if (event.keyCode == KEY_CODES.KEY_CODE_ROCKETSHOOT) {
            keyPressedFlag.rocketShoot = false;
        }
    })
}



function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    let advEnemyPosition = 0;
    let advEnemyDirection = 0;

    let bullets = [];
    let enemyBullets = [];
    let stars = [];
    let enemys = [];
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
    createStars(stars);
    keyPressHendler(keyPressedFlag, bullets, rockets, gameObjects);

    modalWindowProcessing(keyPressedFlag);

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {

        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра

        if (enemys.length == 0) {
            createEnemys(enemys);
        } 
        createNewAdvEnemy(gameObjects.advEnemy);
        
        lastTimestamp = currentTimeStamp;
        gameObjects.ship.direction = getDirection(keyPressedFlag); 
        
        if (!keyPressedFlag.exit) {
            update({ship: gameObjects.ship, deltaTime, bullets, stars, enemys, enemyBullets, rockets: gameObjects.rockets, advEnemy: gameObjects.advEnemy, garbage: gameObjects.garbage});    
            redraw({ctx, ship: gameObjects.ship, width, height, bullets, stars, enemys, enemyBullets, rockets: gameObjects.rockets, advEnemy: gameObjects.advEnemy, garbage: gameObjects.garbage}); 
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

