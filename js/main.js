import { redraw } from './draw.js';
import {AdvancedEnemy, moveAdvEnemy, shootingAdvEnemy, getAdvancedEnemyParam} from './enemy.js';
import {createEnemys, moveEnemys, shootingEnemys} from './enemy.js';
import {enemyConflictHandling, advEnemyConflictHandling} from './enemy.js';

import {Bullet, moveBullets} from './bullets.js';

import {WIDHT, LEFT, RIGHT, MY_SHIP_SIZE, ADV_ENEMY_SHOOTING_TIME, ADV_ENEMY_LINE} from './config.js';
import {} from './config.js';

import {Ship, moveShip, myShipConflictHandling} from './ship.js';

import {moveRockets} from './rocket.js';

import {createStars, moveStar} from './star.js';



const SHIP_MOVEMENT_LINE = 30;

const MY_BULLET_DIRECTION = -1;
const ENEMY_BULLET_DIRECTION = 1;
const BEGIN_HEALTH_STATE = 10;
const BEGIN_COUNT_ROCKETS = 5;

const ADV_ENEMY_HEALTH = 5;
const ADV_ENEMY_LIFES = 3;
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SHOOT = 32;
const KEY_CODE_ROCKETSHOOT = 17;


function KeyPressedFlag({
    left,
    right,
    shoot,
    rocketShoot
}) {
    this.left = left;
    this.right = right;
    this.shoot = shoot;
    this.rocketShoot = rocketShoot;
}


function update({ship, deltaTime, direction, bullets, stars, enemys, enemyBullets, rockets, advEnemy}) {
    let i = 0;
    moveShip({ship, deltaTime});
    moveBullets({bullets: bullets, deltaTime, direction: MY_BULLET_DIRECTION});
    if ((advEnemy) && (advEnemy.health > 0)) {
        moveAdvEnemy({advEnemy, deltaTime, ship});
        shootingAdvEnemy({advEnemy, deltaTime, enemyBullets});
        advEnemyConflictHandling({advEnemy, bullets, rockets});
    }
    if (enemys.length != 0) {
        moveEnemys({enemys, deltaTime});
        enemyConflictHandling({enemys, bullets, rockets});
        shootingEnemys({enemys, deltaTime, enemyBullets});
    }
    moveBullets({bullets: enemyBullets, deltaTime, direction: ENEMY_BULLET_DIRECTION});
    if (rockets.length != 0) {
        moveRockets({rockets, deltaTime});
    }
    myShipConflictHandling({ship, enemyBullets});

    for (const star of stars) {
        moveStar({star, deltaTime});    
    }
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

function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    let advEnemyPosition = 0;
    let advEnemyDirection = 0;

    let bullets = [];
    let enemyBullets = [];
    let rockets = [];
    let stars = [];
    let enemys = [];
    let advEnemy = null;

    let direction = 0;

    let ship = new Ship({
        startX: (width - MY_SHIP_SIZE) / 2, 
        startY: height - SHIP_MOVEMENT_LINE, 
        direction: direction,
        health: BEGIN_HEALTH_STATE,
        countRockers: BEGIN_COUNT_ROCKETS
    });

    getAdvancedEnemyParam({advEnemyPosition, advEnemyDirection});
    
    setTimeout(function() {advEnemy = new AdvancedEnemy({
        startX: advEnemyPosition, 
        startY: ADV_ENEMY_LINE, 
        direction: RIGHT, 
        health: ADV_ENEMY_HEALTH, 
        shootingTime: ADV_ENEMY_SHOOTING_TIME, 
        isShooting: false, 
        lifes: ADV_ENEMY_LIFES});}, 5000);

    let keyPressedFlag = new KeyPressedFlag({
        left: false, 
        right: false,
        shoot: false,
        rocketShoot: false
    });
    createStars(stars);

    document.addEventListener("keydown", (event) => {
        if (event.keyCode == KEY_CODE_LEFT) {
            keyPressedFlag.left = true;
        }
        if ((event.keyCode == KEY_CODE_RIGHT)) {
            keyPressedFlag.right = true;
        }
        if ((event.keyCode == KEY_CODE_SHOOT) && (!keyPressedFlag.shoot)) {
            keyPressedFlag.shoot = true;
            bullets.push(new Bullet({
                startX: ship.x + MY_SHIP_SIZE / 2, 
                startY: ship.y - MY_SHIP_SIZE * Math.cos(Math.PI / 3)
            }));
        }

        if ((event.keyCode == KEY_CODE_ROCKETSHOOT) && (!keyPressedFlag.rocketShoot)) {
            if (ship.countRockers) {
                keyPressedFlag.rocketShoot = true;
                rockets.push(new Bullet({
                    startX: ship.x + MY_SHIP_SIZE / 2, 
                    startY: ship.y - MY_SHIP_SIZE * Math.cos(Math.PI / 3)
                }));
                ship.countRockers--;
            }
        }
    })

    document.addEventListener("keyup", (event) => {
        if (event.keyCode == KEY_CODE_LEFT) {
            keyPressedFlag.left = false;
        }
        if (event.keyCode == KEY_CODE_RIGHT) {
            keyPressedFlag.right = false;
        }
        if (event.keyCode == KEY_CODE_SHOOT) {
            keyPressedFlag.shoot = false;
        }
        if (event.keyCode == KEY_CODE_ROCKETSHOOT) {
            keyPressedFlag.rocketShoot = false;
        }
    })

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {

        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра

        if (enemys.length == 0) {
            createEnemys(enemys);
        } 
        
        if ((advEnemy) && (advEnemy.health <= 0) && advEnemy.lifes > 0)  {
           advEnemy.health = 5; 
           advEnemy.x = - WIDHT * 10; 
           advEnemy.direction = 1, 
           advEnemy.lifes--;
        }

        lastTimestamp = currentTimeStamp;
        ship.direction = getDirection(keyPressedFlag); 
        
        update({ship, deltaTime, bullets, stars, enemys, enemyBullets, rockets, advEnemy});    
        redraw({ctx, ship, MY_SHIP_SIZE, width, height, bullets, stars, enemys, enemyBullets, rockets, advEnemy}); 
        
        if (ship.health == 0) {
            alert('GAME OVER    ');
            return 0;
        }
        
        requestAnimationFrame(animateFn);
    }
    animateFn();
}

main();

