import {WIDHT, LEFT, RIGHT, COUNT_ENEMY_IN_LINE, ENEMY_LINE, BULLET_SIZE, ADV_ENEMY_SHOOTING_TIME} from './config.js';
import {Bullet} from './bullets.js';
import {ROCKET_DESTRUCTION_RADIUS} from './rocket.js';


const ADV_ENEMY_START_POS = 100;
const ENEMY_HORIZONTAL_SPEED = 100;
const ENEMY_SIDE = 25;

function Enemy({
    startX, 
    startY, 
    direction, 
    shootingTime,
    isShooting
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
    lifes
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
            startX: (WIDHT / COUNT_ENEMY_IN_LINE) + 2 * i * ENEMY_SIDE + WIDHT * beginPosition, 
            startY: ENEMY_LINE, 
            direction: currDirection,
            shootingTime: Math.random() * 5,
            isShooting: false   
        }));
    }
}

function getAdvancedEnemyParam({advEnemyPosition, advEnemyDirection}) {
    if (Math.random() < 0.5) {
        advEnemyPosition = -ADV_ENEMY_START_POS;
        advEnemyDirection = 1;
    } else {
        advEnemyPosition = WIDHT + ADV_ENEMY_START_POS;  
        advEnemyDirection = -1;  
    }   
}

function moveEnemys({enemys, deltaTime}) {
    let speedCoef = 1;
    ((enemys[0].x < 0) || (enemys[enemys.length - 1].x > WIDHT))  ? speedCoef = 5: speedCoef = 1;
    for (const enemy of enemys) {
        enemy.x += ENEMY_HORIZONTAL_SPEED * speedCoef * deltaTime * enemy.direction;
    }
    if (((enemys[0].x <= ENEMY_SIDE) && (enemys[0].direction == LEFT)) || 
    (((enemys[enemys.length - 1].x + ENEMY_SIDE) >= WIDHT - ENEMY_SIDE) && (enemys[enemys.length -1].direction == RIGHT))) {
        for (const enemy of enemys) {
            enemy.direction *= -1;
        }   
    }   
}

function moveAdvEnemy({advEnemy, deltaTime, ship}) {
    let speedCoef = 2;
    let coef = 0;

    if ((ship.x - advEnemy.x <= 100) && (advEnemy.x - ship.x <= 100)) {
        speedCoef = 0.5;
        advEnemy.isShooting = true;
    } else {
        speedCoef = 2;
        advEnemy.isShooting = false;
    }

    advEnemy.x += ENEMY_HORIZONTAL_SPEED * deltaTime * speedCoef * advEnemy.direction;
    if (((ship.x > advEnemy.x) && (advEnemy.direction == RIGHT)) || ((ship.x < advEnemy.x) && (advEnemy.direction == LEFT))) {
         
        //advEnemy.y = 1.5 * advEnemy.x  * advEnemy.d + 1.5 * Math.pow(WIDHT, - advEnemy.d);
        (advEnemy.direction == 1) ? coef = 0: coef = 1;
        //advEnemy.y = WIDHT * coef - Math.sqrt(advEnemy.x * 500) *(-advEnemy.d);    
        advEnemy.y = WIDHT * coef - advEnemy.x * (-advEnemy.direction);
    }

    if (((advEnemy.x >= 2 * WIDHT) && (advEnemy.direction == RIGHT)) || ((advEnemy.x < - WIDHT) && (advEnemy.direction == LEFT))) {
        advEnemy.direction *= -1;
        advEnemy.y = ADV_ENEMY_START_POS;
        (advEnemy.direction == 1) ? advEnemy.x = 0: advEnemy.x = WIDHT;
    }
}

function conflictHandling({object1, objectSize1, object2, objectSize2}) {
    let isObject1LeftHandling = (object1.x + objectSize1 > object2.x);
    let isObject1RightHandling = (object1.x - objectSize1 < object2.x + objectSize2);
    let isObject1DownHandling = (object1.y - objectSize1 < object2.y + objectSize2);
    let isObject1UpHandling = true;//(object2.y - object1.y < objectSize1);

    if ((isObject1LeftHandling) && (isObject1RightHandling) && (isObject1DownHandling) && (isObject1UpHandling)) {
        return true;
    } else {
    return false;}
}


function advEnemyConflictHandling({advEnemy, bullets, rockets}) {
    for (let i = 0; i < bullets.length; i++) {
        if (conflictHandling({object1: bullets[i], objectSize1: BULLET_SIZE, object2: advEnemy, objectSize2: ENEMY_SIDE})) {
            bullets.splice(i, 1);
            advEnemy.health --;
        }
    }
    for (let i = 0; i < rockets.length; i++) {

        if (conflictHandling({object1: rockets[i], objectSize1: BULLET_SIZE, object2: advEnemy, objectSize2: ENEMY_SIDE})) {
            rockets.splice(i, 1);
            advEnemy.health -= 5;
        }
    }
    if (advEnemy.health <= 0) {
            advEnemy = null;
    }

    
}

function enemyConflictHandling({enemys, bullets, rockets}) {
    let isHit = false;
    for (const bullet of bullets) {
        for (let i = 0; i < enemys.length; i++) {
            if (conflictHandling({object1: bullet, objectSize1: BULLET_SIZE, object2: enemys[i], objectSize2: ENEMY_SIDE})) {
                 enemys.splice(i, 1);
            }
        }
    }
    for (let j = 0; j < rockets.length; j++) {
        if (rockets[j].y <= ENEMY_LINE) {
            for (let i = 0; i < enemys.length;) {
                if (conflictHandling({object1: rockets[j], objectSize1: BULLET_SIZE + ROCKET_DESTRUCTION_RADIUS, object2: enemys[i], objectSize2: ENEMY_SIDE})) {
               // if (((enemys[i].x  + ENEMY_SIDE > rockets[j].x - ROCKET_DESTRUCTION_RADIUS) && (enemys[i].x < rockets[j].x + ROCKET_DESTRUCTION_RADIUS))) {
                     enemys.splice(i, 1);
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
        advEnemyConflictHandling({advEnemy, bullets, rockets});
    }
}

function updateEnemys({enemys, deltaTime, bullets, rockets, enemyBullets}) {
    if (enemys.length != 0) {
        moveEnemys({enemys, deltaTime});
        enemyConflictHandling({enemys, bullets, rockets});
        shootingEnemys({enemys, deltaTime, enemyBullets});
    }
}

export {Enemy};
export {AdvancedEnemy, updateAdvancedEnemys};
export {createEnemys, updateEnemys};
export {shootingEnemys};
export {shootingAdvEnemy};
export {getAdvancedEnemyParam};
export {advEnemyConflictHandling};
export {enemyConflictHandling};