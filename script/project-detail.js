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

function modalshow() {
    $('.ui.modal').modal('show');
}

$('#trending-generator').html("");
$('div.ui.pushable.segment').css("height", $(window).height() - $('div.ui.menu').height() - 1);
$.get('../generator/trending-card.html', (result) => {
    for (var i = 0; i < 5; i++) {
        $('#trending-generator').append(result);
    }
});

$('#team-generator').html("");
$.get('../generator/team-card.html', (result) => {
    for (var i = 0; i < 5; i++) {
        $('#team-generator').append(result);
    }
});

$('#collaborator-generator').html("");
$.get('../generator/collaborator-card.html', (result) => {
    for (var i = 0; i < 5; i++) {
        $('#collaborator-generator').append(result);
    }
});