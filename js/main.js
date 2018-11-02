
const LEFT = -1;
const RIGHT = 1;
const NO_MOVE = 0;
const SIDE = 30;
const SHIP_SPEED = 100;
const WIDHT = 500;
const HEIGHT = 1000;
const BULLET_SPEED = 300;
const ROCKET_SPEED = 500;
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
const BEGIN_HEALTH_STATE = 5;

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
    health    
}) {
    this.x = startX;
    this.y = startY;
    this.hit = hit;
    this.health = health;
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
    for (let i = 0; i < COUNT_ENEMY_IN_LINE; i++) {
        enemys.push(new Enemy({
            startX: (WIDHT / COUNT_ENEMY_IN_LINE) + 2 * i * ENEMY_SIDE, 
            startY: ENEMY_LINE, 
            direction: LEFT,
            shootingTime: Math.random() * 5,
            shoot: NO_SHOOT   
        }));
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

function drawRocket({ctx, rocket}) {
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.fillRect(rocket.x, rocket.y, 3, 20);
    ctx.fill();
}


function redraw({ctx, ship, side, width, height, bullets, stars, enemys, enemyBullets, rockets}) {
    drawCosmos(ctx, width, height);
    drawStars(ctx, stars);
    drawShip(ctx, ship, SIDE);
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
    if (((ship.x > 0) && (direction ==LEFT)) || ((ship.x + SIDE < WIDHT) && (direction == RIGHT))) {
        ship.x += SHIP_SPEED * deltaTime * direction;
    }   
}
/*
function moveBullet1({bullet, deltaTime, direction}) {
    bullet.y += BULLET_SPEED * deltaTime * direction;
    if (bullet.y <= 0) {
        delete bullet;
    }       
}

function moveBullet({bullet, deltaTime, direction}) {
    bullet.y -= BULLET_SPEED * deltaTime;  
}

function moveEnemyBullet({enemyBullet, deltaTime}) {
    enemyBullet.y += BULLET_SPEED * deltaTime; 
}
*/
function moveStar({star, deltaTime}) {
    star.y += START_SPEED * deltaTime;
    if (star.y > HEIGHT) {
        star.y = 0;
        star.x = Math.random() * WIDHT;
    }    
}

function moveEnemys({enemys, deltaTime}) {
    for (const enemy of enemys) {
        enemy.x += ENEMY_HORIZONTAL_SPEED * deltaTime * enemy.d;
    }
    if (((enemys[0].x <= ENEMY_SIDE) && (enemys[0].d == -1)) || (((enemys[enemys.length - 1].x + ENEMY_SIDE) >= WIDHT - ENEMY_SIDE) && (enemys[enemys.length -1].d == 1))) {
        for (const enemy of enemys) {
            enemy.d *= -1;
        }   
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
function enemyConflictHandling({enemys, bullets}) {
    let i = 0;
    for (const bullet of bullets) {
        for (i = 0; i < enemys.length; i++) {
            if (((enemys[i].x  - bullet.x < BULLET_SIZE) && (bullet.x  - enemys[i].x < ENEMY_SIDE + BULLET_SIZE)) && (bullet.y - enemys[i].y < BULLET_SIZE)) {
                 enemys.splice(i, 1);
            }
        }
    }
}

function myShipConflictHandling({ship, enemyBullets}) {
    let i = 0;
    for (i = 0; i < enemyBullets.length; i++) {
        if (((ship.x  - enemyBullets[i].x < BULLET_SIZE) && (enemyBullets[i].x  - ship.x < SIDE + BULLET_SIZE)) && (ship.y - enemyBullets[i].y < BULLET_SIZE)) {
            //enemys.splice(i, 1);
            //console.log('kill');
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

function checkDeathShip(ship) {
    if (ship.health == 0) {

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


function update({ship, deltaTime, direction, bullets, stars, enemys, enemyBullets, rockets}) {
    let i = 0;
    moveShip({ship, deltaTime, direction});
    moveBullets({bullets: bullets, deltaTime, direction: MY_BULLET_DIRECTION});
  
    if (enemys.length != 0) {
        moveEnemys({enemys, deltaTime});
        enemyConflictHandling({enemys, bullets});
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

function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');
    let isFire = false;
    let isRocketVolley = false;

    let bullets = [];
    let enemyBullets = [];
    let rockets = [];
    let stars = [];
    let enemys = [];
    let ship = new Ship({startX: (width - SIDE) / 2, startY: height - SHIP_MOVEMENT_LINE, hit: NO_HIT, health: BEGIN_HEALTH_STATE});
    let current_direction = new Direction({left: false, right: false, noDirection: false});
    
    createStars(stars);
    
    let direction = 0;

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {

        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        if (enemys.length == 0) {
            createEnemys(enemys);
        }
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
                isRocketVolley = true;
                rockets.push(new Bullet({startX: ship.x + SIDE / 2, startY: ship.y - SIDE * Math.cos(Math.PI / 3)}));
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

        lastTimestamp = currentTimeStamp;
        direction = getDirection(current_direction);
        
        update({ship, deltaTime, direction, bullets, stars, enemys, enemyBullets, rockets});    
        redraw({ctx, ship, SIDE, width, height, bullets, stars, enemys, enemyBullets, rockets}); 
        
        if (ship.health == 0) {
            console.log("GAME OVER");
            return 0;
        }
        
        requestAnimationFrame(animateFn);
    }
    animateFn();
}