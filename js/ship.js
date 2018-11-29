import {BULLET_SIZE, MY_SHIP_SIZE, WIDTH, LEFT, RIGHT} from './config.js';
import { conflictHandling } from './conflict.js';
import { Bullet } from './bullets.js';

const SHIP_SPEED = 100;

function Ship({
    startX,
    startY,
    direction,
    health,
    countRockers    
}) {
    this.x = startX;
    this.y = startY;
    this.direction = direction;
    this.health = health;
    this.countRockers = countRockers;
}

function moveShip({ship, deltaTime}) {
    let isNoConflictLeftBorder = ((ship.x > 0) && (ship.direction == LEFT));
    let isNoConflictRightBorder = ((ship.x + MY_SHIP_SIZE < WIDTH) && (ship.direction == RIGHT));
    if (isNoConflictLeftBorder || isNoConflictRightBorder) {
        ship.x += SHIP_SPEED * deltaTime * ship.direction;
    }   
}

function myShipConflictHandling({ship, enemyBullets}) {
   
    let isHit = false;
    for (let i = 0; i < enemyBullets.length; i++) {
        let isLeftSideShipConflict = (ship.x < enemyBullets[i].x + BULLET_SIZE);
        let isRightSideShipConflict = (ship.x + MY_SHIP_SIZE > enemyBullets[i].x - BULLET_SIZE); 
        let isFrontSideShipConflict = (Math.abs(ship.y - enemyBullets[i].y) < BULLET_SIZE);
        if ((isLeftSideShipConflict) && (isRightSideShipConflict) && (isFrontSideShipConflict)) {
            isHit = true;
            enemyBullets.splice(i, 1);
            break;  
        }
    }
    if (isHit) {
        ship.health--;
        console.log(ship.health);
        isHit = false;
    }
}


export {moveShip, myShipConflictHandling};
export {Ship};
