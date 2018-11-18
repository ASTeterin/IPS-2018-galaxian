const MY_BULLET_COLOR = "blue";
const ENEMY_BULLET_COLOR = "red";
const SIDE = 30;
const STAR_SIZE = 1;
const ENEMY_SIDE = 25;
const BULLET_SIZE = 3;



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


function redraw({ctx, ship, width, height, bullets, stars, enemys, enemyBullets, rockets, advEnemy}) {
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

export  { redraw };