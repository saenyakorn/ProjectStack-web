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
    $.get('../generator/post-generator/paragraph-card.html', (html) => {
        $('#content-column').append(html);
    });
});
$("#add-title").click(function() {
    $.get('../generator/post-generator/title-card.html', (html) => {
        $('#content-column').append(html)
    });
});

$("#add-image").click(function() {
    $.get('../generator/post-generator/image-card.html', (html) => {
        $('#content-column').append(html);
    });
});

$(".close.link.red.icon").click(function() {
    $("#content-column").remove($(this).parentNode.parentNode);
});
$("#post-button").click(function() {
    if ($('#project-name').val() == null) return;
    if ($('#description').val() == null) return;
    var content = [];
    $(".all-content").each(function() {
        if ($(this).hasClass("title")) {
            content.push({ title: $(this).firstChild.firstChild.val() });
        } else if ($(this).hasClass("paragraph")) {
            content.push({ paragraph: $(this).lastChild.firstChild.firstChild.val() });
        } else {
            content.push({ picture: $(this).lastChild.firstChild.src })
        }
        var cookie = getcookie()
        const data = {
            projectName: $('#project-name').val(),
            ownerID: cookie.username,
            description: $("#description").val(),
            tag: $("#project-tag").val(),
            content: content,
        }
        $.ajax({
            url: "https://projectstack.now.sh/project/create",
            data: data,
            datatype: "json",
            success: function(result) {
                console.log(result);
                window.location.href("https://projectstack.now.sh/project/" + result.projectID)
            },
            error: function(error) {
                console.log(error);
            }
        });
    })
});