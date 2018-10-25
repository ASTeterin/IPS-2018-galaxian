
const SKY_COLOR = 240;
const HORIZONT = 0.8;
const SUN_SPEED = 0.1;
const CLOUD_SIZE = 60;
const ORBIT_RADIUS = 360;
const WINDOW_WIDHT = 100;
const WINDOW_HEIGHT = 120;
const CLOUD_RADIUS_X = 60;
const CLOUD_RADIUS_Y = 40;
const HOUSE_WIDHT = 220;
const HOUSE_HEIGHT = 240;
const MIN_CLOUDS_LEVEL = 30;
const MIN_CLOUD_SPEED = 100;
const DELTA_SPEED = 0.0001; 
const MAX_SPEED_COEFFICIENT = 10;
const MIN_SPEED_COEFFICIENT = -10;

const LEFT = -1;
const RIGHT = 1;
const SIDE = 50;
const SHIP_SPEED = 100;
const WIDHT = 500;
const BULLET_SPEED = 500;
const BULLET_SIZE = 5;


function Ship({
    startX,
    startY    
}) {
    this.x = startX;
    this.y = startY
}

function Bullet({
    startX,
    startY    
}) {
    this.x = startX;
    this.y = startY
}

function drawShip(ctx, ship, side) {
          
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(ship.x, ship.y);
    ctx.lineTo(ship.x + side,  ship.y);
    ctx.lineTo(ship.x + side / 2, ship.y - side * Math.cos(Math.PI / 3));
    ctx.fill();

}

/*
function Cloud({
    startX,
    startY,
    speed,
    amplitude
}) {
    this.x = startX;
    this.y = startY;
    this.s = speed;
    this.a = amplitude
}

function Sky({color}) {
    this.color = color;
}

function Sun({
    startX,
    startY,
    radius,
    angle    
}) {
    this.x = startX;
    this.y = startY;
    this.r = radius;
    this.angle = angle;
}

function HslColor({
    hue,
    saturation,
    lightness,
}) {
    this.h = hue;
    this.s = saturation;
    this.l = lightness;

    this.toFillStyle = function () {
        const h = SKY_COLOR;
        const s = this.s * 100;
        const l = this.l;
        return "hsl(" + h + "," + s + "%," + l + "%)";
    }
}



function drawSun({ctx, sun}) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
    ctx.fill();
}

function moveSun({dT, sun, width, height, speedCoefficient}) {
    const deltaAngle = dT * SUN_SPEED * speedCoefficient;
    sun.angle = (sun.angle + deltaAngle) % (2 * Math.PI);
    sun.x = ORBIT_RADIUS * Math.sin(-sun.angle) + width / 2;
    sun.y = ORBIT_RADIUS * Math.cos(sun.angle) + height * HORIZONT; 
}

function drawCloud({ctx, cloud, rX, rY}) {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.ellipse(cloud.x, cloud.y, rX, rY , 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cloud.x + rX / 2, cloud.y + rY / 2, rX, rY , 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cloud.x - rX / 2, cloud.y + rY / 2, rX, rY, 0, 0, Math.PI * 2);
    ctx.fill();
}

function drawGrass(ctx, width, height) {
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.rect(0, height / 1.5, width, height);
    ctx.fill();
}



function drawHouse(ctx, centrX, centrY , houseWidht, houseHight, windowWidht, windowHight, window_color) {
    ctx.beginPath();
    ctx.fillStyle = "brown";
    ctx.rect(centrX - houseWidht/2, centrY, houseWidht, houseHight);
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = "grey";
    ctx.rect(centrX + houseWidht/4, centrY - houseHight/2.5, houseWidht/8, houseHight/3);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(centrX - houseWidht/2, centrY);
    ctx.lineTo(centrX + houseWidht/2, centrY);
    ctx.lineTo(centrX, houseHight/1.5);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = window_color;
    ctx.rect(centrX - windowWidht/2, centrY + (houseHight - windowHight)/2, windowWidht, windowHight);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "grey";
    ctx.moveTo(centrX,  centrY + (houseHight - windowHight)/2);
    ctx.lineTo(centrX,  centrY + (houseHight + windowHight)/2);
    ctx.stroke();

    ctx.moveTo(centrX - windowWidht/2,  centrY + houseHight/2);
    ctx.lineTo(centrX + windowWidht/2,  centrY + houseHight/2);
    ctx.stroke();
}
*/
function redraw({ctx, ship, side, width, height}) {
    drawCosmos(ctx, width, height);
    drawShip(ctx, ship, SIDE);
    
}
/*
function moveCloud({distance, cloud, width, height}) {
    cloud.x -= distance;
    cloud.y += cloud.a * Math.sin(cloud.a * 10 * cloud.x / width);
    if (cloud.x + CLOUD_SIZE * 1.5 < 0) {
        cloud.x = width + CLOUD_SIZE * 1.5;
        cloud.y = (height * (1 - HORIZONT)) /2;
    }
}

function createCloud({boxWidth, boxHeight, speed, amplitude}) {
    const startX = boxWidth;
    const startY = boxHeight;
    return new Cloud({
        startX,
        startY,     
        speed,
        amplitude
    });
}

function moveClouds({dT, clouds, width, height, speedCoefficient}) {
    for (const cloud of clouds) {
        distance = cloud.s * speedCoefficient * dT;
        moveCloud({
            distance,
            cloud,
            width,
            height
        });   
    } 
}*/
function drawCosmos(ctx, width, height) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, width, height);
    ctx.fill();
}

function drawBullet({ctx, bullet}) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, BULLET_SIZE, 0, Math.PI * 2);
    ctx.fill();
}

function moveShip({ship, deltaTime, direction}) {
    if (((ship.x > 0) && (direction ==LEFT)) || ((ship.x + SIDE < WIDHT) && (direction == RIGHT))) {
        ship.x += SHIP_SPEED * deltaTime * direction;
    }   
}

function moveBullet({bullet, deltaTime}) {
    bullet.y -= BULLET_SPEED * deltaTime;
       
}

function update({ship, deltaTime, direction}) {
    moveShip({ship, deltaTime, direction});
}

/*
function updateSky({sky, angle}) {
    const lightness = (Math.sin(angle - Math.PI/2) + 1) * 50 - 10;
    sky.color.l = lightness;
}

function drawSky({ctx, sky, width, height}) {
    ctx.fillStyle = sky.color.toFillStyle();
    ctx.fillRect(0, 0, width, height);
}
*/

function createBullet({startBulletX, startBulletY}) {
    return new Bullet({startBulletX, startBulletY})
}

function main() {
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');
    let isFire = false;

    let bullets = [];
    let ship = new Ship({startX: (width - SIDE) / 2, startY: height - 50});
    var bullet = new Bullet({startX: ship.x + SIDE / 2, startY: ship.y + SIDE});
    let direction = 0;
    drawShip(ctx, ship, SIDE);

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        //direction = 0;
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        //drawShip(ctx, ship, SIDE);
        document.addEventListener("keydown", (event) => {
            if (event.keyCode == 37) {
                direction = LEFT;
            }
        })
    
        document.addEventListener("keydown", (event) => {
            if ((event.keyCode == 39)) {
                direction = RIGHT;
            }
        })

        document.addEventListener("keyup", (event) => {
            if ((event.keyCode == 37) || (event.keyCode == 39)) {
                direction = 0;
            }
            if (event.keyCode == 32) {
                isFire = false;
            }
        })

        document.addEventListener("keydown", (event) => {
            if ((event.keyCode == 32) && (!isFire)) {
                isFire = true;
                bullets.push(new Bullet({startX: ship.x + SIDE / 2, startY: ship.y + SIDE}));
            }
        })


        lastTimestamp = currentTimeStamp;
    
            update({ship, deltaTime, direction});
            
            redraw({ctx, ship, SIDE, width, height});
          
                for (const bullet of bullets) {
                moveBullet({bullet, deltaTime});
                drawBullet({ctx, bullet});
                }
            
                
        
        requestAnimationFrame(animateFn);
    }
    animateFn();
}