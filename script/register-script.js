$('#input-submit').click(function() {
    var allinput = [];
    var valid = true;
    $('.user').each(function() {
        if ($(this).prop('required') && $(this).value == null)
            valid = false;
        allinput.push(this.value);
    })
    if (!valid) return;
    const data = {
        username: allinput[0],
        title: allinput[1],
        firstname: allinput[2],
        lastname: allinput[3],
        birthdate: allinput[4],
        email: allinput[5],
        tel: allinput[6],
        job: allinput[7],
        workplace: allinput[8],
        password: allinput[9],
        confirmpassword: allinput[10],
    };
    $.ajax({
        url: "https://asia-east2-cunex-vote-uat.cloudfunctions.net/api/vote",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log(result);
            if (result.success) {
                $("#username-valid").removeClass("d-none");
                $("#email-valid").removeClass("d-none");
                $("password-valid").removeClass("d-none");

            } else {
                $("#username-invalid").addClass("d-none");
                $("#username-valid").addClass("d-none");
                $("#email-invalid").addClass("d-none");
                $("#email-valid").addClass("d-none");
                $("#password-length").addClass("d-none");
                $("password-noupper").addClass("d-none");
                $("password-nolower").addClass("d-none");
                $("password-unmatch").addClass("d-none");
                $("password-valid").addClass("d-none");
                if (401 in result.val) {
                    $("#username-invalid").removeClass("d-none");
                } else {
                    $("#username-valid").removeClass("d-none");
                }
                if (402 in result.val) {
                    $("#email-invalid").removeClass("d-none");
                } else {
                    $("#email-valid").removeClass("d-none");
                }
                if (403 in result.val) {
                    $("#password-length").removeClass("d-none");
                } else if (404 in result.val) {
                    $("password-noupper").removeClass("d-none");
                } else if (405 in result.val) {
                    $("password-nolower").removeClass("d-none");
                } else if (406 in result.val) {
                    $("password-unmatch").removeClass("d-none");
                } else {
                    $("password-valid").removeClass("d-none");
                }
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
})