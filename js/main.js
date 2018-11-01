
const LEFT = -1;
const RIGHT = 1;
const NO_MOVE = 0;
const SIDE = 30;
const SHIP_SPEED = 100;
const WIDHT = 500;
const HEIGHT = 1000;
const BULLET_SPEED = 300;
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
    startY    
}) {
    this.x = startX;
    this.y = startY
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

function Star({
    startX,
    startY    
}) {
    this.x = startX;
    this.y = startY
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

function redraw({ctx, ship, side, width, height, bullets, stars, enemys, enemyBullets}) {
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
    
    
}

function drawCosmos(ctx, width, height) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, width, height);
    ctx.fill();
}

function createStars(stars) {
    for (let i = 0; i < COUNT_STARS; i++) {
        starX = Math.random() * WIDHT;
        starY = Math.random() * HEIGHT;
        stars.push(new Star({startX: starX, startY: starY}));
    }
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

function moveShip({ship, deltaTime, direction}) {
    if (((ship.x > 0) && (direction ==LEFT)) || ((ship.x + SIDE < WIDHT) && (direction == RIGHT))) {
        ship.x += SHIP_SPEED * deltaTime * direction;
    }   
}

function moveBullet({bullet, deltaTime, direction}) {
    bullet.y -= BULLET_SPEED * deltaTime;
    if (bullet.y <= 0) {
        delete bullet;
    }
       
}

function moveEnemyBullet({enemyBullet, deltaTime}) {
    enemyBullet.y += BULLET_SPEED * deltaTime;
    if (enemyBullet.y > HEIGHT) {
        delete enemyBullet;
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

function enemyConflictHandling({enemys, bullets}) {
    let i = 0;
    for (const bullet of bullets) {
        //if (bullet.y - ENEMY_LINE - ) <= 0) {
            for (i = 0; i < enemys.length; i++) {
                if (((enemys[i].x  - bullet.x >= 0) && (enemys[i].x - bullet.x <= BULLET_SIZE)) && (bullet.y - enemys[i].y <= BULLET_SIZE)) {
                    console.log('!!!!');
                    //delete enemy;
                    enemys.splice(i, 1);
                }
            }

       // }
       
    }
}

function moveBullets({bullets, deltaTime}) {
    for (i = 0; i < bullets.length; i++) {
        moveBullet({bullet: bullets[i], deltaTime});
        if ((bullets[i].y < 0) || (bullets[i] > HEIGHT)) {
            bullets.splice(i, 1);
            //console.log('.');
        }
    }
}


function update({ship, deltaTime, direction, bullets, stars, enemys, enemyBullets}) {
    let i = 0;
    moveShip({ship, deltaTime, direction});
    //moveBullets({bullets: bullets, deltaTime, direction: MY_BULLET_DIRECTION});
    
    for (i = 0; i < bullets.length; i++) {
        moveBullet({bullet: bullets[i], deltaTime});
        if ((bullets[i].y < 0) /*|| (bullets[i] > HEIGHT)*/) {
            bullets.splice(i, 1);
            //console.log('.');
        }
    }
   
    if (enemys.length != 0) {
    moveEnemys({enemys, deltaTime});
    enemyConflictHandling({enemys, bullets});
    shootingEnemys({enemys, deltaTime, enemyBullets});
    }
    //moveBullets({bullets: enemyBullets, deltaTime, direction: ENEMY_BULLET_DIRECTION});
/*
    for (const enemyBullet of enemyBullets) {
        moveEnemyBullet({enemyBullet, deltaTime});    
    }
*/
  
    for (i = 0; i < enemyBullets.length; i++) {
    moveEnemyBullet({enemyBullet: enemyBullets[i], deltaTime});
    if (enemyBullets[i].y > HEIGHT) {
        enemyBullets.splice(i, 1);
        //console.log('.');
    }
}

    for (const star of stars) {
        moveStar({star, deltaTime});    
    }
}


function createBullet({startBulletX, startBulletY}) {
    return new Bullet({startBulletX, startBulletY})
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

    let bullets = [];
    let enemyBullets = [];
    let stars = [];
    let enemys = [];
    let ship = new Ship({startX: (width - SIDE) / 2, startY: height - SHIP_MOVEMENT_LINE});
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
                //current_direction.r = false;
                //current_direction.n = false;
                current_direction.l = true;
            }
            if ((event.keyCode == 39)) {
                current_direction.r = true;
                //current_direction.l = false;
                //current_direction.n = false;
            }
            if ((event.keyCode == 32) && (!isFire)) {
                isFire = true;
                bullets.push(new Bullet({startX: ship.x + SIDE / 2, startY: ship.y - SIDE * Math.cos(Math.PI / 3)}));
            }
        })


        document.addEventListener("keyup", (event) => {
            if (event.keyCode == 37) {
                current_direction.l = false;
                //current_direction.n = true;
            }
            if (event.keyCode == 39) {
                current_direction.r = false;
                //current_direction.n = true;
            }
            if (event.keyCode == 32) {
                isFire = false;
            }
        })
/*

        document.addEventListener("keypress", (event) => {
            if (event.keyCode == 37) {
                direction = LEFT;
            } else if ((event.keyCode == 39)) {
                direction = RIGHT;
            }
        })


        document.addEventListener("keydown", (event) => {
            
        })

*/
        lastTimestamp = currentTimeStamp;
        direction = getDirection(current_direction);
        
        update({ship, deltaTime, direction, bullets, stars, enemys, enemyBullets});    
        redraw({ctx, ship, SIDE, width, height, bullets, stars, enemys, enemyBullets});            
        
        requestAnimationFrame(animateFn);
    }
    animateFn();
}