import {HEIGHT, WIDHT} from './config.js';

const START_SPEED = 100;
const COUNT_STARS = 50;

function Star({
    startX,
    startY    
}) {
    this.x = startX;
    this.y = startY
}

function createStars(stars) {
    for (let i = 0; i < COUNT_STARS; i++) {
        const starX = Math.random() * WIDHT;
        const starY = Math.random() * HEIGHT;
        stars.push(new Star({startX: starX, startY: starY}));
    }
}

function moveStar({star, deltaTime}) {
    star.y += START_SPEED * deltaTime;
    if (star.y > HEIGHT) {
        star.y = 0;
        star.x = Math.random() * WIDHT;
    }    
}


export {createStars, moveStar};