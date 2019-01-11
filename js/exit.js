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
    if ($response.responseText != 0) {
        window.location = 'index.php';
    }
}
