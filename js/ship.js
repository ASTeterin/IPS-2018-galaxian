import {BULLET_SIZE, MY_SHIP_SIZE, WIDTH, LEFT, RIGHT, HEIGHT} from './config.js';
import { conflictHandling } from './conflict.js';
import { Bullet } from './bullets.js';

const SHIP_SPEED = 100;

function Ship({
    startX,
    startY,
    direction,
    health,
    lifes,
    isDemaged,
    countRockers, 
    scores,    
}) {
    this.x = startX;
    this.y = startY;
    this.direction = direction;
    this.health = health;
    this.lifes = lifes;
    this.isDemaged = isDemaged;
    this.countRockers = countRockers;
    this.scores = scores;
}

function moveShip({ship, deltaTime}) {
    let isNoConflictLeftBorder = ((ship.x > 0) && (ship.direction == LEFT));
    let isNoConflictRightBorder = ((ship.x + MY_SHIP_SIZE < WIDTH) && (ship.direction == RIGHT));
    if (isNoConflictLeftBorder || isNoConflictRightBorder) {
        ship.x += SHIP_SPEED * deltaTime * ship.direction;
    }   
}

function myShipConflictHandling({ship, enemyBullets, garbage}) {
   
    let isGarbageContact = false;
    for (let i = 0; i < enemyBullets.length; i++) {
        /*let isLeftSideShipConflict = (ship.x < enemyBullets[i].x + BULLET_SIZE);
        let isRightSideShipConflict = (ship.x + MY_SHIP_SIZE > enemyBullets[i].x - BULLET_SIZE); 
        let isFrontSideShipConflict = (Math.abs(ship.y - enemyBullets[i].y) < BULLET_SIZE);
        if ((isLeftSideShipConflict) && (isRightSideShipConflict) && (isFrontSideShipConflict))*/ 
        if (conflictHandling({object1: enemyBullets[i], objectSize1: BULLET_SIZE, object2: ship, objectSize2: MY_SHIP_SIZE}))
        {
            ship.isDemaged = true;
            enemyBullets.splice(i, 1);
            break;  
        }
    }

    if ((garbage) && (conflictHandling({object1: garbage, objectSize1: garbage.size, object2: ship, objectSize2:MY_SHIP_SIZE}))) {
        if (!garbage.isBonus) {
            ship.health = 0;
            garbage.y = 2 * HEIGHT;
        } else {
            switch (garbage.content) {
                case 'rocket':
                    ship.countRockers += 5;
                    break;
                case 'life':
                    ship.lifes++;
                    break;
                case 'bomb':
                    ship.bomb++;
            }
            garbage.y = 2 * HEIGHT;
        }
    }

    if (ship.isDemaged) {
        ship.health--;
        console.log(ship.health);//
        ship.isDemaged = false;
    }
}


export {moveShip, myShipConflictHandling};
export {Ship};
