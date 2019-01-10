import {BULLET_SIZE, ROCKET_HEIGHT} from './config.js';

const MY_BULLET_COLOR = 'blue';
const ENEMY_BULLET_COLOR = 'red';
const SIDE = 30;
const STAR_SIZE = 1;
const ENEMY_SIDE = 25;
const scoreInfo = document.getElementById('scores');
const lifeInfo = document.getElementById('lifes');
const healthInfo = document.getElementById('health');
const rocketsInfo = document.getElementById('rockets');


function drawShip(ctx, ship, side) {
    const img = new Image();
    img.src = 'web/img/hero.png';
    ctx.drawImage(img, ship.x, ship.y - side);
}

function drawEnemy(ctx, enemy) {
    const img = new Image();
    img.src = 'web/img/enemy1_1.png';
    ctx.drawImage(img, enemy.x, enemy.y);
}


function drawCosmos(ctx, width, height) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(0, 0, width, height);
    ctx.fill();
}


function drawStar(ctx, star) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(star.x, star.y, STAR_SIZE, 0, Math.PI * 2);
    ctx.fill();
}

function drawGarbage(ctx, garbage) {
    const img = new Image();
    if (!garbage.isBonus) {
        img.src = 'web/img/garbage.jpg';
    } else {
        img.src = 'web/img/prize.png';
    }
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
    ctx.fillStyle = 'gold';
    ctx.beginPath();
    ctx.fillRect(rocket.x, rocket.y, BULLET_SIZE, ROCKET_HEIGHT);
    ctx.fill();
}

function drawAdvEnemy(ctx, advEnemy) {
    const img = new Image();
    img.src = 'web/img/enemy2.jpg';
    ctx.drawImage(img, advEnemy.x, advEnemy.y - 30);
}

function redraw({ctx, gameObjects, width, height}) {
    drawCosmos(ctx, width, height);
    drawStars(ctx, gameObjects.stars);
    drawShip(ctx, gameObjects.ship, SIDE);
    if (gameObjects.garbage) {
        drawGarbage(ctx, gameObjects.garbage);
    }
    if ((gameObjects.advEnemy) && (gameObjects.advEnemy.health > 0)) {
        drawAdvEnemy(ctx, gameObjects.advEnemy);
    }
    for (const enemy of gameObjects.enemys) {
        drawEnemy(ctx, enemy, ENEMY_SIDE);
    }
    for (const bullet of gameObjects.bullets) {
        drawBullet({ctx, bullet, bulletColor: MY_BULLET_COLOR});
    }
    for (const bullet of gameObjects.enemyBullets) {
        drawBullet({ctx, bullet, bulletColor: ENEMY_BULLET_COLOR});
    }
    for (const rocket of gameObjects.rockets) {
        drawRocket({ctx, rocket});
    }
    showGameInfo(gameObjects.ship);
}

function showGameInfo(ship) {
    scoreInfo.innerHTML = ship.scores;
    lifeInfo.innerHTML = ship.lifes;
    healthInfo.innerHTML = ship.health;
    rocketsInfo.innerHTML = ship.countRockets;
}

export {redraw};
