//import {postRequest} from './request.js';

/*window.onload = function() {
    const exitBtn = document.getElementById('exit_btn');
    exitBtn.onclick = function() {
        //const data = {'session': ''}
        postRequest('./inc/clear_session.inc.php');
    };
};*/


$(window).on('load', onWindowLoaded);

function onWindowLoaded() {
    exitButtonClicked();
}

function exitButtonClicked() {
    $('#exit_btn').click(function() {
        $.ajax({
            url: './inc/clear_session.inc.php',
            type: 'POST',
            complete: onComplete,
        });
    });
}

function onComplete($response) {
    //console.log($response.responseText);
    if ($response.responseText != 0) {
        window.location = 'index.php';
    }
}