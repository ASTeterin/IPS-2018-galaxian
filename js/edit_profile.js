$(window).on('load', onWindowLoaded);

function onWindowLoaded() {
    removeErrorState();
    clickOnField();
    saveChanges();
    exitWithoutSaving();
}

function removeErrorState() {
    $('#password').removeClass('error_in_field');
    $('#reenter_password').removeClass('error_in_field');  
}


function clickOnField() {
    $('#password').click(function() {
        removeErrorState();
    });
    $('#reenter_password').click(function() {
        removeErrorState();
    });
}

function saveChanges() {
    $('#change_user_info_btn').click(function() {
        removeErrorState();
        updateUserInfo();
    });
}

function updateUserInfo() {
    $password = $('#password').val();
    $username = $('#username').val();
    $confirmedPassword = $('#reenter_password').val();

    if ($password != $confirmedPassword) {
        $('#password').addClass('error_in_field');
        $('#reenter_password').addClass('error_in_field');
    } else {
        $data = {'username': $username, 'password': $password};
        $.ajax({
            url: 'inc/edit_profile.inc.php',
            type: 'POST',
            data: $data,
            dataType: 'json',
            complete: onComplete,
        });
    }
}

function onComplete() {
    $('#change_info_modal').modal('show');
    //window.location = 'personal_accaunt.php';
}

function exitWithoutSaving() {
    $('#exit_user_profile_btn').click(function() {
        window.location = 'personal_accaunt.php';
    });
}



