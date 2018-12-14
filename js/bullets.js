import {HEIGHT, SHIP_PARAMS} from './config.js';

const BULLET_SPEED = 400;

function Bullet({
    startX,
    startY    
}) {
    this.x = startX;
    this.y = startY
}

function createNewShoot(bullets_array, ship)
{
    bullets_array.push(new Bullet({
        startX: ship.x + SHIP_PARAMS.MY_SHIP_SIZE / 2, 
        startY: ship.y - SHIP_PARAMS.MY_SHIP_SIZE * Math.cos(Math.PI / 3)
    }));
    return bullets_array;
}

function moveBullets({bullets, deltaTime, direction}) {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y += BULLET_SPEED * deltaTime * direction;
        if ((bullets[i].y < 0) || (bullets[i].y > HEIGHT)) {
            bullets.splice(i, 1);
        }
    }
}

export {Bullet, moveBullets, createNewShoot};