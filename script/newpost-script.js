//before
$('.ui.dropdown').dropdown();
$('#tag').dropdown({
    values: [{
        name: 'Education',
        value: 'Education'
    }, {
        name: 'Medical',
        value: 'Medical'
    }, {
        name: 'Technology',
        value: 'Technology'
    }, {
        name: 'Software',
        value: 'Software'
    }, {
        name: 'Engineering',
        value: 'Engineering'
    }, {
        name: 'Experiment',
        value: 'Experiment'
    }, {
        name: 'Theory',
        value: 'Theory'
    }, {
        name: 'Art',
        value: 'Art'
    }, {
        name: 'Archetechure',
        value: 'Archetechure'
    }, {
        name: 'Mechanic',
        value: 'Mechanic'
    }, {
        name: 'Language',
        value: 'Language'
    }, {
        name: 'Culture',
        value: 'Culture'
    }, {
        name: 'Food',
        value: 'Food'
    }, {
        name: 'Survice',
        value: 'Survice'
    }, {
        name: 'Survey',
        value: 'Survey'
    }, {
        name: 'Music',
        value: 'Music'
    }, {
        name: 'etc.',
        value: 'etc'
    }]
});
$('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    transition: 'overlay'
}).sidebar('attach events', '#mobile_item');

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


//after

$("#add-text").click(function() {

});
$("#add-title").click(function() {

});
$("#add-image").click(function() {

});