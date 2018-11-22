import {KEY_CODE_LEFT, KEY_CODE_RIGHT, KEY_CODE_ROCKETSHOOT, KEY_CODE_SHOOT} from './config.js';

function KeyPressedFlag({
    left,
    right,
    shoot,
    rocketShoot
}) {
    this.left = left;
    this.right = right;
    this.shoot = shoot;
    this.rocketShoot = rocketShoot;
}

function hendleKeyDown(event, keyPressedFlag, bullets, rockets, ship) {
    if (event.keyCode == KEY_CODE_LEFT) {
        keyPressedFlag.left = true;
    }
    if ((event.keyCode == KEY_CODE_RIGHT)) {
        keyPressedFlag.right = true;
    }
    if ((event.keyCode == KEY_CODE_SHOOT) && (!keyPressedFlag.shoot)) {
        keyPressedFlag.shoot = true;
        bullets.push(new Bullet({
            startX: ship.x + MY_SHIP_SIZE / 2, 
            startY: ship.y - MY_SHIP_SIZE * Math.cos(Math.PI / 3)
        }));
    }

    if ((event.keyCode == KEY_CODE_ROCKETSHOOT) && (!keyPressedFlag.rocketShoot)) {
        if (ship.countRockers) {
            keyPressedFlag.rocketShoot = true;
            rockets.push(new Bullet({
                startX: ship.x + MY_SHIP_SIZE / 2, 
                startY: ship.y - MY_SHIP_SIZE * Math.cos(Math.PI / 3)
            }));
            ship.countRockers--;
        }
    }
}

export { hendleKeyDown, KeyPressedFlag };