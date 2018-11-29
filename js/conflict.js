
function conflictHandling({object1, objectSize1, object2, objectSize2}) {
    let isObject1LeftHandling = (object1.x + objectSize1 > object2.x);
    let isObject1RightHandling = (object1.x - objectSize1 < object2.x + objectSize2);
    let isObject1DownHandling = (object1.y - objectSize1 < object2.y + objectSize2);
    let isObject1UpHandling = (object1.y - objectSize1 > object2.y);

    if ((isObject1LeftHandling) && (isObject1RightHandling) && (isObject1DownHandling) && (isObject1UpHandling)) {
        return true;
    } else {
    return false;}
}

function ringConflictHandling({object1, objectSize1, object2, objectSize2}) {
    let x = Math.pow(Math.abs(object1.x - object2.x), 2);
    let y = Math.pow(Math.abs(object1.y - object2.y), 2);
    if (Math.sqrt(x + y) <= objectSize1 + objectSize2) {
        return true;
    }
}

function rectangleConflictHandling({object1, object1Width, object1Height, object2, object2Width, object2Height}) {
    let isObject1LeftHandling = (object1.x + object1Width > object2.x);
    let isObject1RightHandling = (object1.x - object1Width < object2.x + object2Width);
    let isObject1DownHandling = (object1.y < object2.y + object2Height);
    let isObject1UpHandling = true; //(object1.y > object2.y);//!!!!!!!!!

    if ((isObject1LeftHandling) && (isObject1RightHandling) && (isObject1DownHandling) && (isObject1UpHandling)) {
        return true;
    } else {
    return false;}    
}

export { conflictHandling, rectangleConflictHandling, ringConflictHandling };