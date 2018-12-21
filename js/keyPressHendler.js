import {KEY_CODES} from './config.js';

function KeyPressedFlag({
    left,
    right,
    shoot,
    rocketShoot,
}) {
    this.left = left;
    this.right = right;
    this.shoot = shoot;
    this.rocketShoot = rocketShoot;
}

function keyPressHendler(keyPressedFlag, gameObjects) {
    document.addEventListener('keydown', (event) => {
        if (event.keyCode == KEY_CODES.KEY_CODE_LEFT) {
            keyPressedFlag.left = true;
        }
        if ((event.keyCode == KEY_CODES.KEY_CODE_RIGHT)) {
            keyPressedFlag.right = true;
        }
        if ((event.keyCode == KEY_CODES.KEY_CODE_SHOOT) && (!keyPressedFlag.shoot)) {
            keyPressedFlag.shoot = true;
        }

        if ((event.keyCode == KEY_CODES.KEY_CODE_ROCKETSHOOT) && (!keyPressedFlag.rocketShoot)) {
            if (gameObjects.ship.countRockets) {
                keyPressedFlag.rocketShoot = true;
            }
        }

        if (event.keyCode == KEY_CODES.KEY_CODE_PAUSE) {
            const exitModalWindow = document.getElementById('exitModal');
            const display = window.getComputedStyle(exitModalWindow).display;
            if (display == 'none') {
                exitModalWindow.style.display = 'block';
                keyPressedFlag.stop = true;
            } else {
                exitModalWindow.style.display = 'none';
                keyPressedFlag.stop = false;
            }
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.keyCode == KEY_CODES.KEY_CODE_LEFT) {
            keyPressedFlag.left = false;
        }
        if (event.keyCode == KEY_CODES.KEY_CODE_RIGHT) {
            keyPressedFlag.right = false;
        }
        if (event.keyCode == KEY_CODES.KEY_CODE_SHOOT) {
            keyPressedFlag.shoot = false;
        }
        if (event.keyCode == KEY_CODES.KEY_CODE_ROCKETSHOOT) {
            keyPressedFlag.rocketShoot = false;
        }
    });
}

export {keyPressHendler, KeyPressedFlag};
