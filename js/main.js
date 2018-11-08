
const LEFT = -1;
const RIGHT = 1;
const NO_MOVE = 0;
const SIDE = 30;
const SHIP_SPEED = 100;
const WIDHT = 500;
const HEIGHT = 1000;
const BULLET_SPEED = 400;
const ROCKET_SPEED = 600;
const BULLET_SIZE = 3;
const SHIP_MOVEMENT_LINE = 30;
const STAR_SIZE = 1;
const START_SPEED = 100;
const COUNT_STARS = 50;
const COUNT_ENEMY_IN_LINE = 8;
const ENEMY_SIDE = 25;
const ENEMY_LINE = 50;
const ENEMY_HORIZONTAL_SPEED = 100;
const NO_SHOOT = false;
const MY_BULLET_COLOR = "blue";
const ENEMY_BULLET_COLOR = "red";
const MY_BULLET_DIRECTION = -1;
const ENEMY_BULLET_DIRECTION = 1;
const NO_HIT = false;
const HIT = true;
const BEGIN_HEALTH_STATE = 10;
const BEGIN_COUNT_ROCKETS = 5;
const ROCKET_DESTRUCTION_RADIUS = 50;
const ADV_ENEMY_START_POS = 100;
const ADV_ENEMY_LINE = 100;
const ADV_ENEMY_TIMEOUT = 1000;
const ADV_ENEMY_SHOOTING_TIME = 0.2;
const ADV_ENEMY_HEALTH = 5;

function Direction({
    left,
    right,
    noDirection
}) {
    this.l = left;
    this.r = right;
    this.n = noDirection;
}

function Ship({
    startX,
    startY,
    hit,
    health,
    countRockers    
}) {
    this.x = startX;
    this.y = startY;
    this.hit = hit;
    this.health = health;
    this.CRoc = countRockers;
}

function Enemy({
    startX, 
    startY, 
    direction, 
    shootingTime,
    shoot
}) {
    this.x = startX;
    this.y = startY;
    this.d = direction;
    this.st = shootingTime;
    this.shoot = shoot;
}

function AdvansedEnemy({
    startX, 
    startY, 
    direction, 
    health,
    shootingTime,
    shoot
}) {
    this.x = startX;
    this.y = startY;
    this.d = direction;
    this.h = health;
    this.ShTime = shootingTime;
    this.shoot = shoot;
}

function Bullet({
    startX,
    startY    
}) {
    this.x = startX;
    this.y = startY
}

function Rocket({
    startX,
    startY    
}) {
    this.x = startX;
    this.y = startY
}

function Star({
    startX,
    startY    
}) {
    this.x = startX;
    this.y = startY
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
            shoot: NO_SHOOT   
        }));
    }
}

function getAdvancedEnemyParam({advEnemyPosition, advEnemyDirection}) {
    //let advEnemyPosition = 0;

    if (Math.random() < 0.5) {
        advEnemyPosition = -ADV_ENEMY_START_POS;
        advEnemyDirection = 1;
    } else {
        advEnemyPosition = WIDHT + ADV_ENEMY_START_POS;  
        advEnemyDirection = -1;  
    }   
}

function createStars(stars) {
    for (let i = 0; i < COUNT_STARS; i++) {
        starX = Math.random() * WIDHT;
        starY = Math.random() * HEIGHT;
        stars.push(new Star({startX: starX, startY: starY}));
    }
}

function createBullet({startBulletX, startBulletY}) {
    return new Bullet({startBulletX, startBulletY})
}


function drawShip(ctx, ship, side) {   
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(ship.x, ship.y);
    ctx.lineTo(ship.x + side,  ship.y);
    ctx.lineTo(ship.x + side / 2, ship.y - side * Math.cos(Math.PI / 3));
    ctx.fill();

}

function drawEnemy(ctx, enemy) {
          
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(enemy.x, enemy.y);
    ctx.lineTo(enemy.x + ENEMY_SIDE,  enemy.y);
    ctx.lineTo(enemy.x + ENEMY_SIDE / 2, enemy.y + ENEMY_SIDE * Math.cos(Math.PI / 3));
    ctx.fill();
}


function drawCosmos(ctx, width, height) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, width, height);
    ctx.fill();
}



function drawStar(ctx, star) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(star.x, star.y, STAR_SIZE, 0, Math.PI * 2);
    ctx.fill();    
}

function drawStars(ctx, stars) {
    for (const star of stars) {        
        drawStar(ctx, star);
    }
}

function drawBullet({ctx, bullet, bulletColor}) {
    ctx.fillStyle = bulletColor;
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, BULLET_SIZE, 0, Math.PI * 2);
    ctx.fill();
}
/*
function drawRocket({ctx, rocket}) {
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.fillRect(rocket.x, rocket.y, 3, 20);
    ctx.fill();
}
*/
function drawAdvEnemy(ctx, advEnemy) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.fillRect(advEnemy.x, advEnemy.y, 20, 20);
    ctx.fill();
}


function redraw({ctx, ship, side, width, height, bullets, stars, enemys, enemyBullets, rockets, advEnemy}) {
    drawCosmos(ctx, width, height);
    drawStars(ctx, stars);
    drawShip(ctx, ship, SIDE);
    if ((advEnemy) && (advEnemy.h > 0)) {
        drawAdvEnemy(ctx, advEnemy);
    }
    for (const enemy of enemys) {
        drawEnemy(ctx, enemy, ENEMY_SIDE);
    }
    for (const bullet of bullets) {        
        drawBullet({ctx, bullet, bulletColor: MY_BULLET_COLOR});
    }
    for (const bullet of enemyBullets) {        
        drawBullet({ctx, bullet, bulletColor: ENEMY_BULLET_COLOR});
    }
    for (const rocket of rockets) {        
        drawRocket({ctx, rocket});
    }   
}


function moveShip({ship, deltaTime, direction}) {
    if (((ship.x > 0) && (direction == LEFT)) || ((ship.x + SIDE < WIDHT) && (direction == RIGHT))) {
        ship.x += SHIP_SPEED * deltaTime * direction;
    }   
}

function moveStar({star, deltaTime}) {
    star.y += START_SPEED * deltaTime;
    if (star.y > HEIGHT) {
        star.y = 0;
        star.x = Math.random() * WIDHT;
    }    
}

function moveEnemys({enemys, deltaTime}) {
    let speedCoef = 1;
    ((enemys[0].x < 0) || (enemys[enemys.length - 1].x > WIDHT))  ? speedCoef = 5: speedCoef = 1;
    for (const enemy of enemys) {
        enemy.x += ENEMY_HORIZONTAL_SPEED * speedCoef * deltaTime * enemy.d;
    }
    if (((enemys[0].x <= ENEMY_SIDE) && (enemys[0].d == LEFT)) || (((enemys[enemys.length - 1].x + ENEMY_SIDE) >= WIDHT - ENEMY_SIDE) && (enemys[enemys.length -1].d == RIGHT))) {
        for (const enemy of enemys) {
            enemy.d *= -1;
        }   
    }   
}

function shootingAdvEnemy({advEnemy, deltaTime, enemyBullets}) {
    advEnemy.ShTime -= deltaTime;
    if ((advEnemy.shoot) && (advEnemy.ShTime <= 0)) {
       enemyBullets.push(new Bullet({startX: advEnemy.x, startY: advEnemy.y}));
       advEnemy.ShTime = ADV_ENEMY_SHOOTING_TIME;
    }
}

function shootingEnemys({enemys, deltaTime, enemyBullets}) {
    for (const enemy of enemys) {
        enemy.st -= deltaTime;
        if (enemy.st <= 0) {
            enemy.shoot = true;
            enemy.st = Math.random() * 10;
        }
        if (enemy.shoot) {
            enemyBullets.push(new Bullet({startX: enemy.x + ENEMY_SIDE / 2, startY: enemy.y + ENEMY_SIDE * Math.cos(Math.PI / 3)}));
            enemy.shoot = NO_SHOOT;
        }
    }    
}
/*обработка коллизии*/
function advEnemyConflictHandling({advEnemy, bullets, rockets}) {
    let i = 0;
    for (i = 0; i < bullets.length; i++) {
        if ((bullets[i].x + BULLET_SIZE > advEnemy.x) && (bullets[i].x - BULLET_SIZE < advEnemy.x + 30) && 
        (bullets[i].y - advEnemy.y + 30 < BULLET_SIZE + 30) && (advEnemy.y - bullets[i].y < BULLET_SIZE)) {
            bullets.splice(i, 1);
            advEnemy.h --;
        }
    }
    if (advEnemy.h <= 0) {
        advEnemy = null;
    }

    
}

function enemyConflictHandling({enemys, bullets, rockets}) {
    let i = 0;
    let j = 0;
    let isHit = false;
    for (const bullet of bullets) {
        for (i = 0; i < enemys.length; i++) {
            if (((enemys[i].x  - bullet.x < BULLET_SIZE) && (bullet.x  - enemys[i].x < ENEMY_SIDE + BULLET_SIZE)) && (bullet.y - enemys[i].y < BULLET_SIZE)) {
                 enemys.splice(i, 1);
            }
        }
    }
    for (j = 0; j < rockets.length; j++) {
        if (rockets[j].y <= ENEMY_LINE) {
            for (i = 0; i < enemys.length;) {
                if (((enemys[i].x  + ENEMY_SIDE > rockets[j].x - ROCKET_DESTRUCTION_RADIUS) && (enemys[i].x < rockets[j].x + ROCKET_DESTRUCTION_RADIUS))) {
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

function myShipConflictHandling({ship, enemyBullets}) {
    let i = 0;
    for (i = 0; i < enemyBullets.length; i++) {
        if (((ship.x < enemyBullets[i].x + BULLET_SIZE) && (ship.x + SIDE > enemyBullets[i].x - BULLET_SIZE)) && (Math.abs(ship.y - enemyBullets[i].y) < BULLET_SIZE)) {    
            ship.hit = HIT;
            enemyBullets.splice(i, 1);
            break;  
        }
    }
    if (ship.hit) {
        ship.health--;
        console.log(ship.health);
        ship.hit = NO_HIT;
    }
}


function moveBullets({bullets, deltaTime, direction}) {
    for (i = 0; i < bullets.length; i++) {
        bullets[i].y += BULLET_SPEED * deltaTime * direction;
        if ((bullets[i].y < 0) || (bullets[i].y > HEIGHT)) {
            bullets.splice(i, 1);
        }
    }
}

function moveRockets({rockets, deltaTime}) {
    for (i = 0; i < rockets.length; i++) {
        rockets[i].y -= ROCKET_SPEED * deltaTime;
        if ((rockets[i].y < 0) || (rockets[i].y > HEIGHT)) {
            rockets.splice(i, 1);
        }
    }
}

function moveAdvEnemy({advEnemy, deltaTime, ship}) {
    let speedCoef = 2;

    if ((ship.x - advEnemy.x <= 100) && (advEnemy.x - ship.x <= 100)) {
        speedCoef = 0.5;
        advEnemy.shoot = true;
    } else {
        speedCoef = 2;
        advEnemy.shoot = false;
    }

    advEnemy.x += ENEMY_HORIZONTAL_SPEED * deltaTime * speedCoef * advEnemy.d;
    if ((ship.x > advEnemy.x) && (advEnemy.d == RIGHT) || (ship.x < advEnemy.x) && (advEnemy.d == RIGHT)) {
        advEnemy.y = Math.sqrt(advEnemy.x * 500);    
    }

    if ((advEnemy.x >= WIDHT-50) && (advEnemy.d == RIGHT)) {
        advEnemy.d *= -1;
        advEnemy.y = ADV_ENEMY_LINE;
    }

    if ((advEnemy.x < 50) && (advEnemy.d ==LEFT)) {
        advEnemy.d *= -1;
        advEnemy.y = ADV_ENEMY_LINE;
    }




}


function update({ship, deltaTime, direction, bullets, stars, enemys, enemyBullets, rockets, advEnemy}) {
    let i = 0;
    moveShip({ship, deltaTime, direction});
    moveBullets({bullets: bullets, deltaTime, direction: MY_BULLET_DIRECTION});
    if ((advEnemy) && (advEnemy.h > 0)) {
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
    if ((current_direction.l) && (!current_direction.r) && (!current_direction.n)) {
        return LEFT;
    }
    if ((current_direction.r) && (!current_direction.l) && (!current_direction.n)) {
        return RIGHT;
    }
    if ((current_direction.n) && (!current_direction.l) && (!current_direction.r)) {
        return NO_MOVE;
    }

}

function createAdvEnemy() {

}

function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');
    let isFire = false;
    let isRocketVolley = false;
    let timer = 0;
    let advEnemyPosition = 0;
    let advEnemyDirection = 0;

    let bullets = [];
    let enemyBullets = [];
    let rockets = [];
    let stars = [];
    let enemys = [];
    let advEnemys = [];
    let advEnemy = null;
    let ship = new Ship({
        startX: (width - SIDE) / 2, 
        startY: height - SHIP_MOVEMENT_LINE, 
        hit: NO_HIT, 
        health: BEGIN_HEALTH_STATE,
        countRockers: BEGIN_COUNT_ROCKETS
    });

    //(Math.random() < 0.5) ? advEnemyPosition = -ADV_ENEMY_START_POS: advEnemyPosition = WIDHT + ADV_ENEMY_START_POS;
    getAdvancedEnemyParam({advEnemyPosition, advEnemyDirection});
    
    setTimeout(function() {advEnemy = new AdvansedEnemy({startX: advEnemyPosition, startY: ADV_ENEMY_LINE, direction: RIGHT, health: ADV_ENEMY_HEALTH, shootingTime: ADV_ENEMY_SHOOTING_TIME, shoot: false});}, 5000);
    let current_direction = new Direction({left: false, right: false, noDirection: false});
    
    createStars(stars);
    
    let direction = 0;

    document.addEventListener("keydown", (event) => {
        if (event.keyCode == 37) {
            current_direction.l = true;
        }
        if ((event.keyCode == 39)) {
            current_direction.r = true;
        }
        if ((event.keyCode == 32) && (!isFire)) {
            isFire = true;
            bullets.push(new Bullet({startX: ship.x + SIDE / 2, startY: ship.y - SIDE * Math.cos(Math.PI / 3)}));
        }
        if ((event.keyCode == 17) && (!isRocketVolley)) {
            if (ship.CRoc) {
                isRocketVolley = true;
                rockets.push(new Bullet({startX: ship.x + SIDE / 2, startY: ship.y - SIDE * Math.cos(Math.PI / 3)}));
                ship.CRoc--;
            }
        }
    })

    document.addEventListener("keyup", (event) => {
        if (event.keyCode == 37) {
            current_direction.l = false;
        }
        if (event.keyCode == 39) {
            current_direction.r = false;
        }
        if (event.keyCode == 32) {
            isFire = false;
        }
        if (event.keyCode == 17) {
            isRocketVolley = false;
        }
    })

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {

        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        timer += deltaTime;

        //if (time % advEnemy)

        if (enemys.length == 0) {
            createEnemys(enemys);
        } 

        lastTimestamp = currentTimeStamp;
        direction = getDirection(current_direction);
        
        update({ship, deltaTime, direction, bullets, stars, enemys, enemyBullets, rockets, advEnemy});    
        redraw({ctx, ship, SIDE, width, height, bullets, stars, enemys, enemyBullets, rockets, advEnemy}); 
        
        if (ship.health == 0) {
            console.log("GAME OVER");
            return 0;
        }
        
        requestAnimationFrame(animateFn);
    }
    animateFn();
}