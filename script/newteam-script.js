// anos-script
$('.ui.dropdown').dropdown();
$('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    transition: 'overlay'
}).sidebar('attach events', '#mobile_item');
//nut-script
var content = [];
$.ajax({
    url: "https://projectstack.no.sh/user/all",
    type: "POST",
    data: {},
    datatype: "json",
    success: function(result) {
        console.log(result);
        $.each(result, function(i, user_obj) {
            contact.push(user_obj);
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

$("#create").click(function() {
    var valid = true;
    if ($('#teamname').value() == null) return;

    var members_array = [];

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