//nut
$('#login-click-here').click(function() {
    var allinput = [];
    var valid = true;
    $('.user').each(function() {
        if ($(this).prop('required') && $(this).val() == null)
            valid = false;
        allinput.push($(this).val());
    });
    if (!valid) return;
    const data = {
        username: allinput[0],
        password: allinput[1],
    };
    $.ajax({
        url: "https://projectstack.now.sh/login",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log(result);
            if (result.success) {
                window.location.href = "https://projectstack.now.sh/";
            } else {
                $(".invalid").addClass("d-none");
                if (402 in result.val) {
                    $("#wrong-username").removeClass("d-none");
                } else if (401 in result.val) {
                    $("#wrong-password").removeClass("d-none");
                }
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
});