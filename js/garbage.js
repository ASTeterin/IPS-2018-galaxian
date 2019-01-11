
import {HEIGHT, WIDTH, GARBAGE_SPEED, BULLET_SIZE} from './config.js';
import {ringConflictHandling} from './collision.js';
const GARBAGE_SIZE = 20;
const GARBAGE_SPEED_COEF = 2.6;

function Garbage() {
    this.x = getStartGarbagePosition();
    this.y = -1000;
    this.axis = this.x;
    this.size = GARBAGE_SIZE;
    this.content = getGarbageContent();
    this.isBonus = false;
}

function getStartGarbagePosition() {
    return (Math.random() * WIDTH);
}

function getGarbageContent() {
    let content = '';
    const temp = Math.random() * 10;
    if ((temp > 0) && (temp < 5)) {
        content = 'rocket';
    } else if ((temp >= 5) && (temp < 10)) {
        content = 'life';
    }
    return content;
}

function moveGarbage(garbage, deltaTime) {
    if (garbage) {
        if (garbage.y <= HEIGHT) {
            if ((garbage.y >= -10) && (garbage.y < 0)) {
                garbage.content = getGarbageContent();
                garbage.x = getStartGarbagePosition();
            }
            garbage.y += deltaTime * GARBAGE_SPEED * GARBAGE_SPEED_COEF;
            if (!garbage.isBonus) {
                garbage.x = 50 * Math.sin(garbage.y * 7 / WIDTH) + garbage.axis;
            } else {
                garbage.x = garbage.axis;
            }
        } else {
            garbage.y = -2 * HEIGHT;
        }
    }
}

function garbageConflictHandling(garbage, bullets) {
    if (!garbage.isBonus) {
        for (let i = 0; i < bullets.length; i++) {
            if (ringConflictHandling({
                object1: garbage,
                objectSize1: garbage.size,
                object2: bullets[i],
                objectSize2: BULLET_SIZE,
            })) {
                bullets.splice(i, 1);
                garbage.isBonus = true;
            }
        }
    }
}


function updateGarbage(garbage, deltaTime, bullets) {
    if (garbage) {
        moveGarbage(garbage, deltaTime);
        garbageConflictHandling(garbage, bullets);
    }
}


export {Garbage, getStartGarbagePosition, updateGarbage};
