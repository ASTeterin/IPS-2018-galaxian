import {BULLET_SIZE, MY_SHIP_SIZE, WIDHT, LEFT, RIGHT} from './config.js';

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
    if (((ship.x > 0) && (ship.direction == LEFT)) || ((ship.x + MY_SHIP_SIZE < WIDHT) && (ship.direction == RIGHT))) {
        ship.x += SHIP_SPEED * deltaTime * ship.direction;
    }   
}

function myShipConflictHandling({ship, enemyBullets}) {
    let i = 0;
    let isHit = false;
    for (let i = 0; i < enemyBullets.length; i++) {
        if (((ship.x < enemyBullets[i].x + BULLET_SIZE) && (ship.x + MY_SHIP_SIZE > enemyBullets[i].x - BULLET_SIZE)) 
        && (Math.abs(ship.y - enemyBullets[i].y) < BULLET_SIZE)) {    
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
