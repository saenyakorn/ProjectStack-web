$('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    transition: 'overlay'
}).sidebar('attach events', '#mobile_item');

$('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    transition: 'overlay'
}).sidebar('attach events', '#computer_item');

$('.ui.icon.top.left.pointing.dropdown.button').dropdown({
    clearable: false
});

$('div.ui.pushable.segment').css("height", $(window).height() - $('div.ui.menu').height() - 1);

function getcookie() {
    var x = document.cookie.split(";");
    var y = {}
    for (var i = 0; i < x.length; i++) {
        try {
            var z = x[i].split("=");
            y[z[0].trim()] = z[1].trim();
        } catch (err) {}
    }
    return y;
};






const cookie = getcookie();
$('#username').html(cookie.username)
if (!("username" in cookie)) {
    $('.guest').css('display', 'flex');
    $('.logged-in').css('display', 'none');
} else {
    $('.guest').css('display', 'none');
    $('.logged-in').css('display', 'flex');
}




$('#button-submit').click(function() {
    var allinput = [];
    var valid = true;
    $('.user').each(function() {
        if ($(this).prop("required") && $(this).val() == null);
        valid = false;
        allinput.push($(this).val());
    })
    if (!valid) return;
    const data = {
        Username: allinput[0],
        Fullname: allinput[1],
        Email: allinput[2],
        Tel: allinput[3],
        url: allinput[4],
        Status: allinput[5],
        resume1: allinput[6],
        resume2: allinput[7],
        resume3: allinput[8],
        resume4: allinput[9],
        resume5: allinput[10],
        link: allinput[11],
    };
    $.ajax({
        url: "https://projectstack.now.sh/user/edit",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log(result);
            window.location.href = "https://projectstack.now.sh/user/edit";
        },
        error: function(error) {
            console.log(error);
        }
    })
})