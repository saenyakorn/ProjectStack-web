$('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    transition: 'overlay'
}).sidebar('attach events', '#mobile_item');

$('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    transition: 'overlay'
}).sidebar('attach events', '#computer_item');



$('#edit-submit').click(function() {
    var allinput = [];
    var valid = true;
    $('.user').each(function() {
        if ($(this).prop('required') && $(this).value == null)
            valid = false;
        allinput.push(this.value);
    })
    if (!valid) return;
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
})