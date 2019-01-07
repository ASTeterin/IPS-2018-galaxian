const ERR_NO_PARAM = '1';
const ERR_USER_NOT_EXIST = '2';
const ERR_INCORRECT_PASS = '3';

$(window).on('load', onWindowLoaded);

function onWindowLoaded() {
    loginButtonClicked();
}


function loginButtonClicked() {
    $('#login_btn').click(function() {
        $login = $('#login').val();
        $password = $('#currentPassword').val();
        const $data = {'login': $login, 'password': $password};
        $.ajax({
            url: 'inc/login.inc.php',
            type: 'POST',
            data: $data,
            dataType: 'json',
            complete: onCompleteLogin,
        });
    });
}

function showLoginError($errorCode) {
    $('#info_modal').modal('show');
    $('#info_title').text('Ошибка');
    switch ($errorCode) {
        case ERR_NO_PARAM:
            $('#user_name').text('Введите имя пользователя и пароль');
            break;
        case ERR_USER_NOT_EXIST:
            $('#user_name').text('Пользователь не существует');
            break;
        case ERR_INCORRECT_PASS:
            $('#user_name').text('Неверный пароль');
    }
    $('#user_name').text('Неверное имя пользователя или пароль');
}



function onCompleteLogin($response) {
    //console.log($response.responseText);
    if ($response.responseText != 0) {
        showLoginError($response.responseText);
    } else {
        window.location = 'personal_accaunt.php';
    }
}
