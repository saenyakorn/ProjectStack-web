//cookie function
function getcookie() {
    var x = document.cookie.split(";");
    var y = {}
    for (var i = 0; i < x.length; i++) {
        var z = x[i].split("=");
        y[z[0]] = z[1];
    }
    return y;
};


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
    data: {
        fields: ["username", "email", "profilepic_url"]
    },
    datatype: "json",
    success: function(result) {
        console.log(result);
        $.each(result, function(i, user_obj) {
            content.push({ title: user_obj.username });
            obj_username[user_obj.username] = user_obj;
        });
        $('.ui.search').search({
            source: content
        });
        //leader generator
        var leader_cookie = getcookie()
        var nln = leader_cookie.username;
        var val = { username: nln, email: obj_username[nln].email, p_pic_url: obj_username[nln].profilepic_url };
        $.get('../generator/member-card-mustache.html', (html) => {
            var output = Mustache.render(html, val);
            $('#leader-generator').append(output);
        });
    },
    error: function(error) {
        console.log(error);
    }
});




//nut
$("#plus-member").click(function() {
    if ($("#new-member-name").value() in obj_username) {
        var nmn = $("#new-member-name").value()
        var val = { username: nmn, email: obj_username[nmn].email, p_pic_url: obj_username[nmn].profilepic_url };
        $.get('../generator/member-card-mustache.html', (html) => {
            var output = Mustache.render(html, val);
            $('#member-generator').append(output);
        });
        $("#new-member-name").value() = null;
    } else {
        $("#new-member-name").value() = null;
    }
});
$("#create").click(function() {
    var valid = true;
    if ($('#team-name').value() == null) return;

    var members_array = [];
    $('.member-username').each(function() {
        members_array.push($(this).value());
    });

    const team_info = {
        teamName: $('#team-name').value(),
        leaderID: $('#leader-name').value(),
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

$(".delete-but").click(function() {
    $("#member-generator").remove($(this).parentNode.parentNode);
});