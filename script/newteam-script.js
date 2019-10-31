//yu
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
// anos-script
$('.ui.dropdown').dropdown();
$('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    transition: 'overlay'
}).sidebar('attach events', '#mobile_item');
//nut-script
var content = [];
var obj_username = {};
$.ajax({
    url: "https://projectstack.no.sh/user/all",
    type: "POST",
    data: {},
    datatype: "json",
    success: function(result) {
        console.log(result);
        $.each(result, function(i, user_obj) {
            content.push({ title: user_obj.username });
            obj_username[user_obj.username] = user_obj;
        });
    },
    error: function(error) {
        console.log(error);
    }
});

//anos
$('.ui.search').search({
    source: content
});

//nut
$("#plus-member").click(function() {
    if ($("#new-member-name").value() in obj_username) {
        var val = { username: $("#new-member-name").value(), email: obj_username[$("#new-member-name").value()].email };
        $.get('../generator/member-card-mustache', (html) => {
            var output = Mustache.render(html, val);
            $('#project-generator').append(output);
        });
        $("#new-member-name").value() = null;
    } else {
        $("#new-member-name").value() = null
    }
});
$("#create").click(function() {
    var valid = true;
    if ($('#teamname').value() == null) return;

    var members_array = [];
    $("")

    const team_info = {
        teamName: $('#teamname').value(),
        leaderID: " ",
        members: members_array
    };
    $.ajax({
        url: "https://projectstack.no.sh/team/create",
        type: "POST",
        data: team_info,
        datatype: "json",
        success: function(result) {
            console.log(result);
            window.location.href("https://projectstack.no.sh")
        },
        error: function(error) {
            console.log(error);
        }

    });
});