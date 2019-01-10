import {WIDTH, LEFT, RIGHT, COUNT_ENEMY_IN_LINE, ENEMY_LINE, BULLET_SIZE, ROCKET_HEIGHT, ADV_ENEMY_SHOOTING_TIME, 
    ADV_ENEMY_LINE} from './config.js';
import {Bullet} from './bullets.js';
import {ROCKET_DESTRUCTION_RADIUS} from './rocket.js';
import {conflictHandling, rectangleConflictHandling} from './conflict.js';


const ADV_ENEMY_START_POS = 100;
const ENEMY_HORIZONTAL_SPEED = 100;
const ENEMY_SIDE = 25;
const ADV_ENEMY_HEALTH = 5;
const ADV_ENEMY_LIFES = 3;

function Enemy({
    startX,
    startY,
    direction,
    shootingTime,
    isShooting,
}) {
    this.x = startX;
    this.y = startY;
    this.direction = direction;
    this.shootingTime = shootingTime;
    this.isShooting = isShooting;
}

function AdvancedEnemy({
    startX,
    startY,
    direction,
    health,
    shootingTime,
    isShooting,
    lifes,
}) {
    this.x = startX;
    this.y = startY;
    this.direction = direction;
    this.health = health;
    this.ShTime = shootingTime;
    this.isShooting = isShooting;
    this.lifes = lifes;
}

function createEnemys(enemys) {
    let beginPosition = -1;
    let currDirection = LEFT;
    if (Math.random() > 0.5) {
        beginPosition = 1;
        currDirection = RIGHT;
    }
    for (let i = 0; i < COUNT_ENEMY_IN_LINE; i++) {
        enemys.push(new Enemy({
            startX: (WIDTH / COUNT_ENEMY_IN_LINE) + 2 * i * ENEMY_SIDE + WIDTH * beginPosition,
            startY: ENEMY_LINE,
            direction: currDirection,
            shootingTime: Math.random() * 5,
            isShooting: false,
        }));
    }
}

function createAdvEnemy(advEnemyPosition) {
    return new AdvancedEnemy({
        startX: advEnemyPosition,
        startY: ADV_ENEMY_LINE,
        direction: RIGHT,
        health: ADV_ENEMY_HEALTH,
        shootingTime: ADV_ENEMY_SHOOTING_TIME,
        isShooting: false,
        lifes: ADV_ENEMY_LIFES,
    });
}

// переименовать функцию
function setAdvancedEnemyParam({advEnemyPosition, advEnemyDirection}) {
    if (Math.random() < 0.5) {
        advEnemyPosition = -ADV_ENEMY_START_POS;
        advEnemyDirection = 1;
    } else {
        advEnemyPosition = WIDTH + ADV_ENEMY_START_POS;
        advEnemyDirection = -1;
    }
}

function moveEnemys({enemys, deltaTime}) {
    let speedCoef = 1;
    ((enemys[0].x < 0) || (enemys[enemys.length - 1].x > WIDTH)) ? speedCoef = 5: speedCoef = 1;
    for (const enemy of enemys) {
        enemy.x += ENEMY_HORIZONTAL_SPEED * speedCoef * deltaTime * enemy.direction;
    }

    if (((enemys[0].x <= ENEMY_SIDE) && (enemys[0].direction == LEFT)) ||
    (((enemys[enemys.length - 1].x + ENEMY_SIDE) >= WIDTH - ENEMY_SIDE) && (enemys[enemys.length -1].direction == RIGHT))) {
        for (const enemy of enemys) {
            enemy.direction *= -1;
        }
    }
}

function moveAdvEnemy({advEnemy, deltaTime, ship}) {
    let speedCoef = 2;
    let coef = 0;

    if ((ship.x - advEnemy.x <= 100) && (advEnemy.x - ship.x <= 100)) {
        speedCoef = 1.5;
        advEnemy.isShooting = true;
    } else {
        speedCoef = 3;
        advEnemy.isShooting = false;
    }

    advEnemy.x += ENEMY_HORIZONTAL_SPEED * deltaTime * speedCoef * advEnemy.direction;
    if (((ship.x > advEnemy.x) && (advEnemy.direction == RIGHT)) || ((ship.x < advEnemy.x) && (advEnemy.direction == LEFT))) {
        (advEnemy.direction == 1) ? coef = 0: coef = 1;
        advEnemy.y = WIDTH * coef - advEnemy.x * (-advEnemy.direction);
    }

    if (((advEnemy.x >= 2 * WIDTH) && (advEnemy.direction == RIGHT)) || ((advEnemy.x < - WIDTH) && (advEnemy.direction == LEFT))) {
        advEnemy.direction *= -1;
        advEnemy.y = ADV_ENEMY_START_POS;
        (advEnemy.direction == 1) ? advEnemy.x = 0: advEnemy.x = WIDTH;
    }
}

function advEnemyConflictHandling({advEnemy, bullets, rockets, ship}) {
    for (let i = 0; i < bullets.length; i++) {
        if (conflictHandling({object1: bullets[i], objectSize1: BULLET_SIZE, object2: advEnemy, objectSize2: ENEMY_SIDE})) {
            bullets.splice(i, 1);
            advEnemy.health --;
        }
    }
    for (let i = 0; i < rockets.length; i++) {
        if (conflictHandling({
            object1: rockets[i],
            objectSize1: BULLET_SIZE,
            object2: advEnemy,
            objectSize2: ENEMY_SIDE}
        )) {
            rockets.splice(i, 1);
            advEnemy.health -= ADV_ENEMY_HEALTH;
        }
    }
    if (advEnemy.health <= 0) {
        ship.scores += 50;
    }
}

function enemyConflictHandling({enemys, bullets, rockets, ship}) {
    let isHit = false;
    for (const bullet of bullets) {
        for (let i = 0; i < enemys.length; i++) {
            const param1 = conflictHandling({
                object1: bullet, 
                objectSize1: BULLET_SIZE, 
                object2: enemys[i], 
                objectSize2: ENEMY_SIDE
            });

            if (param1) {
                enemys.splice(i, 1);
                ship.scores += 10;
            }
        }
    }
    for (let j = 0; j < rockets.length; j++) {
        if (rockets[j].y <= ENEMY_LINE) {
            for (let i = 0; i < enemys.length;) {
                if (rectangleConflictHandling({
                    object1: rockets[j],
                    object1Width: BULLET_SIZE + ROCKET_DESTRUCTION_RADIUS,
                    object1Height: ROCKET_HEIGHT,
                    object2: enemys[i],
                    object2Width: ENEMY_SIDE,
                    object2Height: ENEMY_SIDE,
                })) {
                    enemys.splice(i, 1);
                    ship.scores += 10;

                    isHit = true;
                } else {
                    i++;
                }
            }
            if (isHit) {
                rockets.splice(j, 1);
                isHit = false;
            }
        }
    }
}

function shootingEnemys({enemys, deltaTime, enemyBullets}) {
    for (const enemy of enemys) {
        enemy.shootingTime -= deltaTime;
        if (enemy.shootingTime <= 0) {
            enemy.isShooting = true;
            enemy.shootingTime = Math.random() * 10;
        }
        if (enemy.isShooting) {
            enemyBullets.push(new Bullet({startX: enemy.x + ENEMY_SIDE / 2, startY: enemy.y + ENEMY_SIDE * Math.cos(Math.PI / 3)}));
            enemy.isShooting = false;
        }
    }
}

function shootingAdvEnemy({advEnemy, deltaTime, enemyBullets}) {
    advEnemy.ShTime -= deltaTime;
    if ((advEnemy.isShooting) && (advEnemy.ShTime <= 0)) {
        enemyBullets.push(new Bullet({startX: advEnemy.x, startY: advEnemy.y}));
        advEnemy.ShTime = ADV_ENEMY_SHOOTING_TIME;
    }
}

function updateAdvancedEnemys({advEnemy, deltaTime, ship, bullets, enemyBullets, rockets}) {
    if ((advEnemy) && (advEnemy.health > 0)) {
        moveAdvEnemy({advEnemy, deltaTime, ship});
        shootingAdvEnemy({advEnemy, deltaTime, enemyBullets});
        advEnemyConflictHandling({advEnemy, bullets, rockets, ship});
    }
}

function updateEnemys({enemys, deltaTime, bullets, rockets, enemyBullets, ship}) {
    if (enemys.length != 0) {
        moveEnemys({enemys, deltaTime});
        enemyConflictHandling({enemys, bullets, rockets, ship});
        shootingEnemys({enemys, deltaTime, enemyBullets});
    }
}

function createNewAdvEnemy(advEnemy) {
    if ((advEnemy) && (advEnemy.health <= 0) && advEnemy.lifes > 0) {
        advEnemy.health = ADV_ENEMY_HEALTH;
        advEnemy.x = - WIDTH * 10;
        advEnemy.direction = 1,
        advEnemy.lifes--;
    }
}

export {Enemy};
export {AdvancedEnemy, updateAdvancedEnemys, createAdvEnemy};
export {createEnemys, updateEnemys};
export {shootingEnemys};
export {shootingAdvEnemy};
export {setAdvancedEnemyParam};
export {advEnemyConflictHandling};
export {enemyConflictHandling, createNewAdvEnemy};
