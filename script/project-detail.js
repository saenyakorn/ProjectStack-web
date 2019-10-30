$('div.ui.pushable.segment').css("height", $(window).height() - $('div.ui.menu').height() - 1);
$('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    transition: 'overlay'
}).sidebar('attach events', '#mobile_item');

$.get('../generator/trending-card.html', (result) => {
    for (var i = 0; i < 5; i++) {
        $('#trending-generator').append(result);
    }
});