/* setting semantic ui */

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
    console.log(document.cookie);
    var x = document.cookie.split(";");
    console.log(x.length);
    var y = {}
    for (var i = 0; i < x.length; i++) {
        try {
            var z = x[i].split("=");
            y[z[0].trim()] = z[1].trim();
        } catch (err) {

        }
    }
    return y;
};

/* end of setting semantic ui */

function addMoreCard() {
    $('.ui.active.dimmer').css("display", "flex");
    data = {
        currentsize: $('.ui.segment.project-card').length,
        batch: 5
    }
    $.ajax({
        url: "https://projectstack.now.sh/project/all",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            //console.log("success", result)
            result.forEach(async(val, inx, arr) => {
                await $.get('./generator/project-card-mustache.html', (html) => {
                    var output = Mustache.render(html, val);
                    $('#project-generator').append(output);
                })
                $('.ui.active.dimmer').css("display", "none");
            })
            if (result.length == 0) {
                $('.ui.active.dimmer').css("display", "none");
            }
        },
        error: function(error) {
            //console.log("error", error)
        }
    })
}

function TrendingCard() {
    data = {}
    $.ajax({
        url: "https://projectstack.now.sh/project/all/trending",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            //console.log("success", result)
            result.forEach((val, inx, arr) => {
                $.get('./generator/trending-card-mustache.html', (html) => {
                    var output = Mustache.render(html, val);
                    $('#trending-generator').append(output);
                })
            })
            $('.ui.active.dimmer').css("display", "none");
        },
        error: function(error) {
            //console.log("error", error)
        }
    })
}

addMoreCard();
TrendingCard();
console.log("COOKIE: " + document.cookie);
const cookie = getcookie();
console.log("COOKIE: " + cookie);
$('#username').html(cookie.username)
$('#username_mobile').html(cookie.username)
if (!("username" in cookie)) {
    $('.guest').css('display', 'flex');
    $('.logged-in').css('display', 'none');
} else {
    $('.guest').css('display', 'none');
    $('.logged-in').css('display', 'flex');
}