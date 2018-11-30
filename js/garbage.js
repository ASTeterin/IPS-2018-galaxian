
import {HEIGHT, WIDTH, GARBAGE_SPEED, BULLET_SIZE} from './config.js';
import {ringConflictHandling} from './conflict.js';

function Garbage({
    startX,
    startY,
    axis,
    size,
    content,
    isBonus
}) {
    this.x = startX;
    this.y = startY;
    this.axis = axis;
    this.size = size;
    this.content = content;
    this.isBonus = isBonus;
}

function getStartGarbagePosition()
{
    return (Math.random() * WIDTH);
}

function moveGarbage(garbage, deltaTime) {
    if (garbage) {
        if (garbage.y <= HEIGHT) {
            garbage.y += deltaTime * GARBAGE_SPEED * 0.6;
            if (!garbage.isBonus) {
                garbage.x = 50 * Math.sin(garbage.y * 7 / WIDTH) + garbage.axis;
            } else {
                garbage.x = garbage.axis;
            }
        }
    }
}

function garbageConflictHandling(garbage, bullets) {
    if (!garbage.isBonus) {
        for (let i = 0; i < bullets.length; i++) {
            if (ringConflictHandling({object1: garbage, 
                objectSize1: garbage.size, 
                object2: bullets[i], 
                objectSize2: BULLET_SIZE
            })) {
                bullets.splice(i, 1);
                garbage.size = 10;
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







export {Garbage, getStartGarbagePosition, updateGarbage}