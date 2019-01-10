import {createShip} from './ship.js';
import {createAdvEnemy} from './enemy.js';
import {Garbage} from './garbage.js';

function GameObjects(width, height, advEnemyPosition) {
    this.ship = createShip(width, height);
    this.advEnemy = createAdvEnemy(advEnemyPosition);
    this.bullets = [];
    this.rockets = [];
    this.enemys = [];
    this.enemyBullets = [];
    this.garbage = new Garbage({});
    this.stars = [];
}

export {GameObjects};
