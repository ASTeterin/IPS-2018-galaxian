$(window).on('load', onWindowLoaded);

function onWindowLoaded() {
    registerButtonClicked();
    removeErrorState('#password', 'error_in_field');
    removeErrorState('#reEnterPassword', 'error_in_field');
}

function registerButtonClicked() {
    $('#registr_user_btn').click(function() {
        $login = $('#username').val();
        $password = $('#password').val();
        $confirmedPassword = $('#reEnterPassword').val();
        if (($login != '') && ($password != '') && ($confirmedPassword != '')) {
            event.preventDefault();
        }
        $('#password').removeClass('error_in_field');
        $('#reEnterPassword').removeClass('error_in_field');
        if ($password != $confirmedPassword) {
            $('#password').addClass('error_in_field');
            $('#reEnterPassword').addClass('error_in_field');
        } else {
            const data = {'login': $login, 'password': $password};
            $.post('registration.php', data, onComplete, 'json');
            //$('#registrationModal').modal('hide');
        }
    });
}

function removeErrorState($selector, $class) {
    $($selector).click(function() {
        $($selector).removeClass($class);
    });
}

function onComplete(response) {
    console.log(response);
}
