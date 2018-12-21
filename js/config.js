
const WIDTH = 500;
const HEIGHT = 1000;
const LEFT = -1;
const RIGHT = 1;
const COUNT_ENEMY_IN_LINE = 8;
const SHIP_PARAMS = {
    'SHIP_MOVEMENT_LINE': 30,
    'BEGIN_HEALTH_STATE': 10,
    'BEGIN_COUNT_ROCKETS': 5,
    'COUNT_MY_LIFES': 1,
    'MY_SHIP_SIZE': 30,
};

const ENEMY_LINE = 50;
const ADV_ENEMY_LINE = 100;
const BULLET_SIZE = 3;
const ROCKET_HEIGHT = 20;
const ADV_ENEMY_SHOOTING_TIME = 0.2;
const GARBAGE_SPEED = 50;

const KEY_CODES = {
    'KEY_CODE_LEFT': 37,
    'KEY_CODE_RIGHT': 39,
    'KEY_CODE_SHOOT': 32,
    'KEY_CODE_ROCKETSHOOT': 17,
    'KEY_CODE_PAUSE': 27,
};


export {WIDTH};
export {HEIGHT};
export {LEFT, RIGHT};
export {COUNT_ENEMY_IN_LINE, ENEMY_LINE, ADV_ENEMY_SHOOTING_TIME, ADV_ENEMY_LINE};
export {SHIP_PARAMS};
export {BULLET_SIZE};
export {KEY_CODES};
export {ROCKET_HEIGHT};
export {GARBAGE_SPEED};
