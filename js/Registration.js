$(window).on('load', onWindowLoaded);

function onWindowLoaded() {
    registerButtonClicked();
    loginFieldClicked();
    removeErrorState('#password', 'error_in_field');
    removeErrorState('#reEnterPassword', 'error_in_field');
}

function clearErrorInfoField($fieldName) {
    $($fieldName).text('');
}

function loginFieldClicked() {
    $('#username').click(function() {
        clearErrorInfoField('#error_registration');
    });
}

function registerButtonClicked() {
    $('#registr_user_btn').click(function() {
        $login = $('#username').val();
        $password = $('#password').val();
        $confirmedPassword = $('#reEnterPassword').val();
        if (($login != '') && ($password != '') && ($confirmedPassword != '')) {
            event.preventDefault();
            if ($password != $confirmedPassword) {
                $('#password').addClass('error_in_field');
                $('#reEnterPassword').addClass('error_in_field');
            } else {
                const $data = {'login': $login, 'password': $password};
                $.ajax({
                    url: 'registration.php',
                    type: 'POST',
                    data: $data,
                    dataType: 'json',
                    complete: onComplete,
                });
            }
        }
        $('#password').removeClass('error_in_field');
        $('#reEnterPassword').removeClass('error_in_field');
    });
}

function removeErrorState($selector, $class) {
    $($selector).click(function() {
        $($selector).removeClass($class);
    });
}

function parseResponse($response) {
    $response = $response.replace(/"/g, '');
    $params = $response.split(':');
    $status = $params[0].replace('{', '');
    if ($status.indexOf('success') != -1) {
        $name = $params[1].slice(0, -1);
        return {status: 1, name: $name};
    } else {
        return {status: 0};
    }
}

function showUserInfo($name) {
    $('#info_modal').modal('show');
    $('#info_title').text('Регистрация');
    $('#user_name').text('Пользователь ' + $name + ' успешно зарегистрирован');
}

function onComplete($response) {
    $responseObj = parseResponse($response.responseText);

    if ($responseObj.status === 1) {
        $('.modal').modal('hide');
        showUserInfo($responseObj.name);
        //$('#info_modal').modal('show');
        //$('#user_name').text($responseObj.name);
        $('#login').val($responseObj.name);
    } else {
        $('#error_registration').text('User alrady exist');
    }
}

