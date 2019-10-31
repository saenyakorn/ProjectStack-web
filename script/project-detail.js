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

function getQueryStringArgs() {
    var qs = document.cookie;
    var args = {};
    var items = qs.length ? qs.split(';') : [];
    var item = null;
    var name = null;
    var value = null;
    for (i = 0; i < items.length; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

/* end of setting semantic ui */

function modalshow() {
    $('.ui.modal').modal('show');
}

$('#trending-generator').html("");
$('#team-generator').html("");
$('#collaborator-generator').html("");

$.get('../generator/trending-card.html', (result) => {
    for (var i = 0; i < 5; i++) {
        $('#trending-generator').append(result);
    }
});

$.get('../generator/team-card.html', (result) => {
    for (var i = 0; i < 5; i++) {
        $('#team-generator').append(result);
    }
});

$.get('../generator/collaborator-card.html', (result) => {
    for (var i = 0; i < 5; i++) {
        $('#collaborator-generator').append(result);
    }
});

function TrendingCard() {
    data = {}
    $.ajax({
        url: "https://projectstack.now.sh/",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log("success", result)
            result.forEach((val, inx, arr) => {
                $.get('./generator/treding-card-mustache.html', (html) => {
                    var output = Mustache.render(html, val);
                    $('#trending-generator').append(output);
                })
            })
        },
        error: function(error) {
            console.log("error", error)
        }
    })
}

function TeamCard() {
    data = {}
    $.ajax({
        url: "https://projectstack.now.sh/user/all",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log("success", result)
            result.forEach((val, inx, arr) => {
                $.get('./generator/team-card-mustache.html', (html) => {
                    var output = Mustache.render(html, val);
                    $('#team-generator').append(output);
                })
            })
        },
        error: function(error) {
            console.log("error", error)
        }
    })
}

function CollaboratorCard() {
    data = {

    }
    $.ajax({
        url: "https://projectstack.now.sh/user/all",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log("success", result)
            result.forEach((val, inx, arr) => {
                $.get('./generator/collaborator-card-mustache.html', (html) => {
                    var output = Mustache.render(html, val);
                    $('#collaborator-generator').append(output);
                })
            })
        },
        error: function(error) {
            console.log("error", error)
        }
    })
}

function ProjectDetail() {
    data = {

    }
    $.ajax({
        url: "https://projectstack.now.sh/user/all",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log("success", result)
            result.forEach((val, inx, arr) => {
                $.get('../page/project-detail.html', (html) => {
                    var output = Mustache.render(html, val);
                    $('body').append(output);
                })
            })
            $('.ui.active.dimmer').css("display", "none");
        },
        error: function(error) {
            console.log("error", error)
        }
    })
}