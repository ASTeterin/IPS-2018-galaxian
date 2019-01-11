import {HEIGHT, WIDTH} from './config.js';

const START_SPEED = 100;
const COUNT_STARS = 250;

function Star({
    startX,
    startY,
}) {
    this.x = startX;
    this.y = startY;
}

function createStars() {
    const stars = [];
    for (let i = 0; i < COUNT_STARS; i++) {
        const starX = Math.random() * WIDTH;
        const starY = Math.random() * HEIGHT;
        stars.push(new Star({startX: starX, startY: starY}));
    }
    return stars;
}

function moveStar({star, deltaTime}) {
    star.y += START_SPEED * deltaTime;
    if (star.y > HEIGHT) {
        star.y = Math.random() * HEIGHT - 500;
        star.x = Math.random() * WIDTH;
    }
}

function updateStars({stars, deltaTime}) {
    for (const star of stars) {
        moveStar({star, deltaTime});
    }
}

export {createStars, updateStars};
