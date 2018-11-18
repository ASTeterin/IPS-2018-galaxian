import {HEIGHT} from './config.js';

const ROCKET_DESTRUCTION_RADIUS = 50;
const ROCKET_SPEED = 600;

function moveRockets({rockets, deltaTime}) {
    for (let i = 0; i < rockets.length; i++) {
        rockets[i].y -= ROCKET_SPEED * deltaTime;
        if ((rockets[i].y < 0) || (rockets[i].y > HEIGHT)) {
            rockets.splice(i, 1);
        }
    }
}

export {ROCKET_DESTRUCTION_RADIUS, moveRockets};