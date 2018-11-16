
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
const MY_BULLET_COLOR = "blue";
const ENEMY_BULLET_COLOR = "red";
const MY_BULLET_DIRECTION = -1;
const ENEMY_BULLET_DIRECTION = 1;
const BEGIN_HEALTH_STATE = 10;
const BEGIN_COUNT_ROCKETS = 5;
const ROCKET_DESTRUCTION_RADIUS = 50;
const ADV_ENEMY_START_POS = 100;
const ADV_ENEMY_LINE = 100;
const ADV_ENEMY_TIMEOUT = 1000;
const ADV_ENEMY_SHOOTING_TIME = 0.2;
const ADV_ENEMY_HEALTH = 5;
const ADV_ENEMY_LIFES = 3;

function Direction({
    left,
    right,
}) {
    this.left = left;
    this.right = right;
}

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

function AdvansedEnemy({
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
    if ((advEnemy) && (advEnemy.health > 0)) {
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


function moveShip({ship, deltaTime}) {
    if (((ship.x > 0) && (ship.direction == LEFT)) || ((ship.x + SIDE < WIDHT) && (ship.direction == RIGHT))) {
        ship.x += SHIP_SPEED * deltaTime * ship.direction;
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
        enemy.x += ENEMY_HORIZONTAL_SPEED * speedCoef * deltaTime * enemy.direction;
    }
    if (((enemys[0].x <= ENEMY_SIDE) && (enemys[0].direction == LEFT)) || 
    (((enemys[enemys.length - 1].x + ENEMY_SIDE) >= WIDHT - ENEMY_SIDE) && (enemys[enemys.length -1].direction == RIGHT))) {
        for (const enemy of enemys) {
            enemy.direction *= -1;
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
/*обработка коллизии*/
function advEnemyConflictHandling({advEnemy, bullets, rockets}) {
    let i = 0;
    for (i = 0; i < bullets.length; i++) {
        if ((bullets[i].x + BULLET_SIZE > advEnemy.x) && (bullets[i].x - BULLET_SIZE < advEnemy.x + 30) && 
        (bullets[i].y - advEnemy.y + 30 < BULLET_SIZE + 30) && (advEnemy.y - bullets[i].y < BULLET_SIZE)) {
            bullets.splice(i, 1);
            advEnemy.health --;
        }
    }
    if (advEnemy.health <= 0) {
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
    let isHit = false;
    for (i = 0; i < enemyBullets.length; i++) {
        if (((ship.x < enemyBullets[i].x + BULLET_SIZE) && (ship.x + SIDE > enemyBullets[i].x - BULLET_SIZE)) 
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
        advEnemy.y = ADV_ENEMY_LINE;
        (advEnemy.direction == 1) ? advEnemy.x = 0: advEnemy.x = WIDHT;
    }


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

function createAdvEnemys(advEnemys, advEnemyPosition) {
    for (let i = 0; i < 3; i++) {
        advEnemys.push = new AdvansedEnemy({startX: advEnemyPosition, startY: ADV_ENEMY_LINE, direction: RIGHT, health: ADV_ENEMY_HEALTH, shootingTime: ADV_ENEMY_SHOOTING_TIME, shoot: false});
    }
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

    let direction = 0;

    let ship = new Ship({
        startX: (width - SIDE) / 2, 
        startY: height - SHIP_MOVEMENT_LINE, 
        direction: direction,
        health: BEGIN_HEALTH_STATE,
        countRockers: BEGIN_COUNT_ROCKETS
    });

    //(Math.random() < 0.5) ? advEnemyPosition = -ADV_ENEMY_START_POS: advEnemyPosition = WIDHT + ADV_ENEMY_START_POS;
    getAdvancedEnemyParam({advEnemyPosition, advEnemyDirection});
    
    setTimeout(function() {advEnemy = new AdvansedEnemy({
        startX: advEnemyPosition, 
        startY: ADV_ENEMY_LINE, 
        direction: RIGHT, 
        health: ADV_ENEMY_HEALTH, 
        shootingTime: ADV_ENEMY_SHOOTING_TIME, 
        isShooting: false, 
        lifes: ADV_ENEMY_LIFES});}, 5000);
    let current_direction = new Direction({left: false, right: false});
    createStars(stars);

    document.addEventListener("keydown", (event) => {
        if (event.keyCode == 37) {
            current_direction.left = true;
        }
        if ((event.keyCode == 39)) {
            current_direction.right = true;
        }
        if ((event.keyCode == 32) && (!isFire)) {
            isFire = true;
            bullets.push(new Bullet({startX: ship.x + SIDE / 2, startY: ship.y - SIDE * Math.cos(Math.PI / 3)}));
        }
        if ((event.keyCode == 17) && (!isRocketVolley)) {
            if (ship.countRockers) {
                isRocketVolley = true;
                rockets.push(new Bullet({
                    startX: ship.x + SIDE / 2, 
                    startY: ship.y - SIDE * Math.cos(Math.PI / 3)
                }));
                ship.countRockers--;
            }
        }
    })

    document.addEventListener("keyup", (event) => {
        if (event.keyCode == 37) {
            current_direction.left = false;
        }
        if (event.keyCode == 39) {
            current_direction.right = false;
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

        if (enemys.length == 0) {
            createEnemys(enemys);
        } 
        
        if ((advEnemy) && (advEnemy.health <= 0) && advEnemy.lifes > 0)  {
           // setTimeout(function() {advEnemy.health = 5; advEnemy.x = - WIDHT; advEnemy.direction = 1, advEnemy.lifes--}, 5000); 
           advEnemy.health = 5; advEnemy.x = - WIDHT * 10; advEnemy.direction = 1, advEnemy.lifes--;
        }

        lastTimestamp = currentTimeStamp;
        ship.direction = getDirection(current_direction);
        
        update({ship, deltaTime, bullets, stars, enemys, enemyBullets, rockets, advEnemy});    
        redraw({ctx, ship, SIDE, width, height, bullets, stars, enemys, enemyBullets, rockets, advEnemy}); 
        
        if (ship.health == 0) {
            alert('GAME OVER    ');
            return 0;
        }
        
        requestAnimationFrame(animateFn);
    }
    animateFn();
}