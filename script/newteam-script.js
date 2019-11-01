//cookie function
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
    url: "https://projectstack.now.sh/user/all",
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
        $(".delete-but").click(function() {
            alert($(this).parent().parent().html());
        });
    },
    error: function(error) {
        console.log(error);
    }
});




//nut
$("#plus-member").click(function() {
    if ($("#new-member-name").val() in obj_username) {
        var nmn = $("#new-member-name").val()
        var val = { username: nmn, email: obj_username[nmn].email, p_pic_url: obj_username[nmn].profilepic_url };
        $.get('../generator/member-card-mustache.html', (html) => {
            var output = Mustache.render(html, val);
            $('#member-generator').append(output);
        });;
    };
    $("#new-mmber-name").val() = null;
    $(".delete-but").click(function() {
        alert($(this).parent().parent().html);
    });
});

$("#create").click(function() {
    var valid = true;
    if ($('#team-name').val() == null) return;

    var members_array = [];
    $('.member-username').each(function() {
        members_array.push($(this).val());
    });

    const team_info = {
        teamName: $('#team-name').val(),
        leaderID: $('#leader-name').val(),
        members: members_array
    };
    $.ajax({
        url: "https://projectstack.now.sh/team/create",
        type: "POST",
        data: team_info,
        datatype: "json",
        success: function(result) {
            console.log(result);
            window.location.href = "https://projectstack.now.sh"
        },
        error: function(error) {
            console.log(error);
        }

    });
});


$("#cancel").click(function() {
    window.history.back();
});