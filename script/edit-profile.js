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




$('#button-submit').click(function() {
    var allinput = [];
    $('.user').each(function() {
        allinput.push(this.value);
    })
    const data = {
        Name: allinput[0],
        Fullname: allinput[1],
        Email: allinput[2],
        Tel: allinput[3],
        url: allinput[4],
        Status: allinput[5],
        resume1: allinput[6],
        resume2: allinput[7],
        resume3: allinput[8],
        resume4: allinput[9],
        resume5: allinput[10],
        link: allinput[11],
    };
    $.ajax({
        url: "https://projectstack.now.sh/",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            console.log(result);
        },
        error: function(error) {
            console.log(error);
        }
    })
})