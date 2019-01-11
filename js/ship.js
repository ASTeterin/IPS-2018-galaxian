import {SHIP_PARAMS, BULLET_SIZE, WIDTH, LEFT, RIGHT, HEIGHT} from './config.js';
import {conflictHandling} from './collision.js';

const SHIP_SPEED = 100;
const LIFE = 'life';
const ROCKET = 'rocket';

function Ship({
    startX,
    startY,
    direction,
    health,
    lifes,
    isDemaged,
    countRockets,
    scores,
    canShoot,
}) {
    this.x = startX;
    this.y = startY;
    this.direction = direction;
    this.health = health;
    this.lifes = lifes;
    this.isDemaged = isDemaged;
    this.countRockets = countRockets;
    this.scores = scores;
    this.canShoot = canShoot;
}

function moveShip({ship, deltaTime}) {
    const isNoConflictWithLeftBorder = ((ship.x > 0) && (ship.direction == LEFT));
    const isNoConflictWithRightBorder = ((ship.x + SHIP_PARAMS.MY_SHIP_SIZE < WIDTH) && (ship.direction == RIGHT));
    if (isNoConflictWithLeftBorder || isNoConflictWithRightBorder) {
        ship.x += SHIP_SPEED * deltaTime * ship.direction;
    }
}

function createShip(width, health) {
    return new Ship({
        startX: (width - SHIP_PARAMS.MY_SHIP_SIZE) / 2,
        startY: health - SHIP_PARAMS.SHIP_MOVEMENT_LINE,
        direction: 0,
        health: SHIP_PARAMS.BEGIN_HEALTH_STATE,
        lifes: SHIP_PARAMS.COUNT_MY_LIFES,
        isDemaged: false,
        countRockets: SHIP_PARAMS.BEGIN_COUNT_ROCKETS,
        scores: 0,
        canShoot: true,
    });
}


function myShipConflictHandling({ship, enemyBullets, garbage}) {
    for (let i = 0; i < enemyBullets.length; i++) {
        if (conflictHandling({object1: enemyBullets[i],
            objectSize1: BULLET_SIZE,
            object2: ship,
            objectSize2: SHIP_PARAMS.MY_SHIP_SIZE,
        })) {
            ship.isDemaged = true;
            enemyBullets.splice(i, 1);
            break;
        }
    }

    if ((garbage) && (conflictHandling({object1: garbage, objectSize1: garbage.size, object2: ship, objectSize2: SHIP_PARAMS.MY_SHIP_SIZE}))) {
        if (!garbage.isBonus) {
            ship.health = 0;
        } else {
            switch (garbage.content) {
            case ROCKET:
                ship.countRockets += SHIP_PARAMS.BEGIN_COUNT_ROCKETS;
                break;
            case LIFE:
                ship.lifes++;
                break;
            }
            garbage.isBonus = false;
        }
        garbage.x = Math.random() * WIDTH;
        garbage.y = -2 * HEIGHT;
    }

    if (ship.isDemaged) {
        ship.health--;
        if (ship.health <= 0) {
            ship.lifes--;
            if (ship.lifes > 0) {
                ship.health = SHIP_PARAMS.BEGIN_HEALTH_STATE;
            }
        }
        ship.isDemaged = false;
    }
}


export {moveShip, myShipConflictHandling, Ship, createShip};
