//nut
$('#login-click-here').click(function() {
    $(".invalid").addClass("d-none");
    var allinput = [];
    var valid = true;
    $('.user').each(function() {
        if ($(this).prop('required') && !$(this).val())
        {
            console.log($(this).prop("placeholder"));
            if($(this).prop("placeholder") == "USERNAME")
                $("#no-username").removeClass("d-none");
            else
                $("#no-password").removeClass("d-none");
            valid = false;
        }
        allinput.push($(this).val());
    });
    console.log(valid);
    if (!valid) return;
    const data = {
        username: allinput[0],
        password: allinput[1],
    };
    $.ajax({
        url: "/login",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log(result);
            if (result.success) {
                window.location.href = "/";
            } else {
                if (result.val.includes(402)) {
                    console.log($("#wrong-username"));
                    $("#wrong-username").removeClass("d-none");
                } else if (result.val.includes(401)) {
                    $("#wrong-password").removeClass("d-none");
                }
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
});