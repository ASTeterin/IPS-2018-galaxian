$(window).on('load', onWindowLoaded);

function onWindowLoaded() {
    //getSelectedItems();
    $currentUsername = $('#username').val();
    removeErrorState('#password', 'error_in_field');
    removeErrorState('#reenter_password', 'error_in_field');
    changePassword();
    saveChanges($currentUsername);
}

function removeErrorState($selector, $class) {
    $($selector).click(function() {
        $($selector).removeClass($class);
    });
}
/*
function getSelectedItems() {
    $friends = [];
    $list = $('#friends_list');
    for (let i = 0; i < 10; i++) {
        if ($list.options[i].selected) {
            $friends.push($list.options[i].value);
        }
    }
    $friends.val();
    return $friends;
}
*/
function changePassword() {
    $('#change_pass').click(function() {
        if ($(this).is(':checked')) {
            $('#password').removeAttr('readonly');
            $('#reenter_password').removeAttr('readonly');
        } else {
            $('#password').attr('readonly', true);
            $('#reenter_password').attr('readonly', true);
        }
    });
}

function checkPassword($password, $confirmedPassword) {
    if ($password != $confirmedPassword) {
        $('#password').addClass('error_in_field');
        $('#reenter_password').addClass('error_in_field');
        return false;
    }
    return true;
}


function saveChanges($friends) {
    $('#change_user_info_btn').click(function() {
        updateUserInfo($friends);
    });
}

function updateUserInfo($currentUsername) {
    $username = $('#username').val();
    $password = '';
    $password = $('#password').val();
    $confirmedPassword = $('#reenter_password').val();
    if (($username == $currentUsername) && ($password == '')) {
        return;
    }

    if ($('#change_pass').is(':checked')) {
        checkPassword($password, $confirmedPassword);
    }
    
    $data = {'username': $username, 'password': $password};
    $.ajax({
        url: 'inc/edit_profile.inc.php',
        type: 'POST',
        data: $data,
        dataType: 'json',
        complete: onComplete,
    });
}

function onComplete() {
    window.location = 'personal_accaunt.php';
}

