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

/* end of setting semantic ui */

$('#project-generator').html("");
$('#trending-generator').html("");
$.get('./generator/trending-card.html', (result) => {
    for (var i = 0; i < 5; i++) {
        $('#trending-generator').append(result);
    }
});

function addMoreCard() {
    data = {
        batch: 5
    }
    $.ajax({
        url: "https://projectstack.now.sh/project/all",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log("success", result)
            result.forEach((val, inx, arr) => {
                $.get('./generator/project-card-mustache.html', (html) => {
                    var output = Mustache.render(html, val);
                    $('#project-generator').append(output);
                })
            })
            $('.ui.active.dimmer').css("display", "none");
        },
        error: function(error) {
            console.log("error", error)
        }
    })
}

function TrendingCard() {
    data = {
        batch: 5
    }
    $.ajax({
        url: "https://projectstack.now.sh/trending/all",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log("success", result)
            for (var i = 0; i < result.length; i++) {
                $.get('./generator/trending-card-mustache.html', (html) => {
                    var output = Mustache.render(html, result[i]);
                    $('#trending-generator').append(output);
                });
            }
        },
        error: function(error) {
            console.log("error", error)
        }
    })
}

addMoreCard();