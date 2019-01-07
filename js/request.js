function getXmlHttp() {
    const xmlhttp = new XMLHttpRequest();
    return xmlhttp;
}

function postRequest(url, data) {
    const xmlhttp = getXmlHttp();
    xmlhttp.open('POST', url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                //callback(JSON.parse(xmlhttp.responseText));
                //callback(xmlhttp.responseText);
            }
        }
    };
    xmlhttp.send(serializeObject(data));
}

function serializeObject(obj) {
    const str = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }
    return str.join('&');
}

export {postRequest};
