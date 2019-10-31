//anos
$('.ui.dropdown').dropdown();
$('#date').calendar({
    type: 'date'
});
//nut
$('#input-submit').click(function() {
    var allinput = [];
    var valid = true;
    $('.user').each(function() {
        if ($(this).prop('required') && $(this).val() == null)
            valid = false;

        allinput.push($(this).val());
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
        confirmpassword: allinput[10]
    };
    $.ajax({
        url: "https://projectstack.now.sh/register",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log(result);
            if (result.success) {
                $(".valid").removeClass("d-none");
                $(".valid").addClass("d-none");
                window.location.href = "https://projectstack.now.sh/";
            } else {
                $(".invalid").addClass("d-none");
                $(".valid").addClass("d-none");
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
                    $("#password-noupper").removeClass("d-none");
                } else if (405 in result.val) {
                    $("#password-nolower").removeClass("d-none");
                } else if (406 in result.val) {
                    $("#password-unmatch").removeClass("d-none");
                } else {
                    $("#password-valid").removeClass("d-none");
                }
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
});