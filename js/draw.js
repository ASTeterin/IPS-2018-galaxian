import {WIDTH, LEFT, RIGHT, COUNT_ENEMY_IN_LINE, ENEMY_LINE, BULLET_SIZE, ROCKET_HEIGHT, ADV_ENEMY_SHOOTING_TIME} from './config.js';

const MY_BULLET_COLOR = "blue";
const ENEMY_BULLET_COLOR = "red";
const SIDE = 30;
const STAR_SIZE = 1;
const ENEMY_SIDE = 25;
const scoreInfo = document.getElementById("scores");
const lifeInfo = document.getElementById("lifes");
const healthInfo = document.getElementById("health");

//const BULLET_SIZE = 3;





function drawShip(ctx, ship, side) {  
    
    //var img = document.getElementById ('ship');
    var img = new Image();
    img.src = 'web/img/hero.png';
    //img.src="http://www.minkbooks.com/content/snow.jpg";

    /*ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(ship.x, ship.y);
    ctx.lineTo(ship.x + side,  ship.y);
    ctx.lineTo(ship.x + side / 2, ship.y - side * Math.cos(Math.PI / 3));
    ctx.fill();*/
    //ctx.drawImage('../web/img/galaxian.jpg', ship.x, ship.y);
    ctx.drawImage(img, ship.x, ship.y - side);

}

function drawEnemy(ctx, enemy) {        
    /*ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(enemy.x, enemy.y);
    ctx.lineTo(enemy.x + ENEMY_SIDE,  enemy.y);
    ctx.lineTo(enemy.x + ENEMY_SIDE / 2, enemy.y + ENEMY_SIDE * Math.cos(Math.PI / 3));
    ctx.fill();*/
    var img = new Image();
    img.src = 'web/img/enemy1_1.png';
    ctx.drawImage(img, enemy.x, enemy.y);

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

function drawGarbage(ctx, garbage) {
    /*ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(garbage.x, garbage.y, garbage.size, 0, Math.PI * 2);
    ctx.fill();  */
    
    var img = new Image();
    img.src = 'web/img/garbage.jpg';
    ctx.drawImage(img, garbage.x, garbage.y);
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
    ctx.fillRect(rocket.x, rocket.y, BULLET_SIZE, ROCKET_HEIGHT);
    ctx.fill();
}

function drawAdvEnemy(ctx, advEnemy) {
   /* ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.fillRect(advEnemy.x, advEnemy.y, ENEMY_SIDE, ENEMY_SIDE);
    ctx.fill();*/
    var img = new Image();
    img.src = 'web/img/enemy2.jpg';
    ctx.drawImage(img, advEnemy.x - 15, advEnemy.y - 30);
}


function redraw({ctx, ship, width, height, bullets, stars, enemys, enemyBullets, rockets, advEnemy, garbage}) {
    drawCosmos(ctx, width, height);
    drawStars(ctx, stars);
    drawShip(ctx, ship, SIDE);
    if (garbage) {
        drawGarbage(ctx, garbage);
    }
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
    showGameInfo(ship);  
}

function showGameInfo(ship) {
    scoreInfo.innerHTML = ship.scores;
    lifeInfo.innerHTML = ship.lifes;
    healthInfo.innerHTML = ship.health;
}

export  { redraw };