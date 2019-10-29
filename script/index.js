$('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    transition: 'overlay'
}).sidebar('attach events', '#mobile_item');

<<<<<<< HEAD
$('#project-generator').html("");
$('#trending-generator').html("");
$('div.ui.pushable.segment').css("height", $(window).height() - $('div.ui.menu').height() - 1);

$.get('./generator/project-card.html', (result) => {
=======
$('div.ui.pushable.segment').css("height", $(window).height() - $('div.ui.menu').height() - 1);

$.get('./generator/project-card.html', (result) => {
    $('#project-generator').html("");
>>>>>>> 06b605cbfd487882842b6210b397a3b4a2ebdbce
    for (var i = 0; i < 20; i++) {
        $('#project-generator').append(result);
    }
});

$.get('./generator/trending-card.html', (result) => {
<<<<<<< HEAD
=======
    $('#trending-generator').html("");
>>>>>>> 06b605cbfd487882842b6210b397a3b4a2ebdbce
    for (var i = 0; i < 5; i++) {
        $('#trending-generator').append(result);
    }
});