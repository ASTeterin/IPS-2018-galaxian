
const WIDTH = 500;
const HEIGHT = 1000;
const LEFT = -1;
const RIGHT = 1;
const START_GAME = 1;
const STOP = 2;
const WIN = 1;
const LOOSE = 2;
const COUNT_ENEMY_IN_LINE = 8;
const SHIP_PARAMS = {
    'SHIP_MOVEMENT_LINE': 30,
    'BEGIN_HEALTH_STATE': 10,
    'BEGIN_COUNT_ROCKETS': 10,
    'COUNT_MY_LIFES': 3,
    'MY_SHIP_SIZE': 30,
};

const ENEMY_LINE = 50;
const ADV_ENEMY_LINE = 100;
const BULLET_SIZE = 3;
const ROCKET_HEIGHT = 20;
const ADV_ENEMY_SHOOTING_TIME = 0.2;
const GARBAGE_SPEED = 50;

const KEY_CODES = {
    'LEFT': 37,
    'RIGHT': 39,
    'SHOOT': 32,
    'ROCKETSHOOT': 17,
    'PAUSE': 27,
};


export {
    WIDTH,
    HEIGHT,
    LEFT,
    RIGHT,
    START_GAME,
    STOP,
    WIN,
    LOOSE,
    COUNT_ENEMY_IN_LINE,
    ENEMY_LINE,
    ADV_ENEMY_SHOOTING_TIME,
    ADV_ENEMY_LINE,
    SHIP_PARAMS,
    BULLET_SIZE,
    KEY_CODES,
    ROCKET_HEIGHT,
    GARBAGE_SPEED,
};
