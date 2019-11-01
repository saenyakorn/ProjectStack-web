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
        gender: allinput[1],
        firstName: allinput[2],
        lastName: allinput[3],
        birthdate: allinput[4],
        email: allinput[5],
        tel: allinput[6],
        job: allinput[7],
        workplace: allinput[8],
        password: allinput[9],
        confirmpassword: allinput[10]
    };
    $.ajax({
        url: "/register",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log(result);
            if (result.success) {
                $(".valid").removeClass("d-none");
                $(".invalid").addClass("d-none");
                window.location.href = "/";
            } else {
                $(".invalid").addClass("d-none");
                $(".valid").addClass("d-none");
                if (result.val.includes(401)) {
                    $("#username-invalid").removeClass("d-none");
                } else {
                    $("#username-valid").removeClass("d-none");
                }
                if (result.val.includes(402)) {
                    $("#email-invalid").removeClass("d-none");
                } else {
                    $("#email-valid").removeClass("d-none");
                }
                let ch = true;
                if (result.val.includes(403)) {
                    ch = false;
                    $("#password-length").removeClass("d-none");
                }
                if (result.val.includes(404)) {
                    ch = false;
                    $("#password-noupper").removeClass("d-none");
                }
                if (result.val.includes(405)) {
                    ch = false;
                    $("#password-nolower").removeClass("d-none");
                }
                if (result.val.includes(406)) {
                    ch = false;
                    $("#password-unmatch").removeClass("d-none");
                } 
                if (ch) {
                    $("#password-valid").removeClass("d-none");
                }
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
});