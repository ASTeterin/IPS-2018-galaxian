
function conflictHandling({object1, objectSize1, object2, objectSize2}) {
    const isObject1LeftHandling = ((object2.x - object1.x) < objectSize1);
    const isObject1RightHandling = ((object1.x - object2.x) < objectSize1 + objectSize2);
    const isObject1DownHandling = (Math.abs( object1.y - object2.y) < objectSize1 + objectSize2);
    //const isObject1UpHandling = (Math.abs( object1.y - object2.y) > objectSize1);

    if ((isObject1LeftHandling) && (isObject1RightHandling) && (isObject1DownHandling) /*&& (isObject1UpHandling)*/) {
        return true;
    } else {
        return false;
    }
}

function ringConflictHandling({object1, objectSize1, object2, objectSize2}) {
    const x = Math.pow(Math.abs(object1.x - object2.x), 2);
    const y = Math.pow(Math.abs(object1.y - object2.y), 2);
    if (Math.sqrt(x + y) <= objectSize1 + objectSize2) {
        return true;
    }
}

function rectangleConflictHandling({object1, object1Width, object1Height, object2, object2Width, object2Height}) {
    const isObject1LeftHandling = (object1.x + object1Width > object2.x);
    const isObject1RightHandling = (object1.x - object1Width < object2.x + object2Width);
    const isObject1DownHandling = (object1.y < object2.y + object2Height);

    if ((isObject1LeftHandling) && (isObject1RightHandling) && (isObject1DownHandling)) {
        return true;
    } else {
        return false;
    }
}

export {conflictHandling, rectangleConflictHandling, ringConflictHandling};
