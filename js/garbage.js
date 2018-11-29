
import {HEIGHT, GARBAGE_SPEED} from './config.js';

function Garbage({
    startX,
    startY,
    size,
    content
}) {
    this.x = startX;
    this.y = startY;
    this.size = size;
    this.content = content;
}

function moveGarbage({garbage, deltaTime}) {
    if (garbage) {
        if (garbage.y <= HEIGHT) {
            garbage.y += deltaTime * GARBAGE_SPEED;
           // garbage.x = Math.sin((garbage.y % Math.PI) / 20) + 100;
        }
    }
}





export {Garbage, moveGarbage}