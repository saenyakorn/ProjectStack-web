/* setting semantic ui */

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

function getQueryStringArgs() {
    var qs = document.cookie;
    var args = {};
    var items = qs.length ? qs.split(';') : [];
    var item = null;
    var name = null;
    var value = null;
    for (i = 0; i < items.length; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

function getProjectID() {
    var url = window.location.href;
    var items = url.split('/');
    var last = items[items.length - 1];
    if (last.includes('?')) {
        last = last.split('?')[0]
    }
    return last
}

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

/* end of setting semantic ui */

function modalshow() {
    $('.ui.modal.join').modal('show');
}

function modalshowrequest() {
    $('.ui.modal.request').modal('show');
}

$('#team-generator').html("");
$('#trending-generator').html("");
$('#collaborator-generator').html("");

function TrendingCard() {
    data = {}
    $.ajax({
        url: "https://projectstack.now.sh/project/all/trending",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            //console.log("success", result)
            result.forEach((val, inx, arr) => {
                $.get('../generator/trending-card-mustache.html', (html) => {
                    var output = Mustache.render(html, val);
                    $('#trending-generator').append(output);
                })
            })
        },
        error: function(error) {
            //console.log("error", error)
        }
    })
}

function TeamCard() {
    data = {
        username: cookie.username,
        fields: ['username', 'email', 'teams']
    }
    $.ajax({
        url: "https://projectstack.now.sh/user/info",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            //console.log("success", result)
            result.teams.forEach((val, inx, arr) => {
                $.get('../generator/team-card-mustache.html', (html) => {
                    var output = Mustache.render(html, val);
                    $('#team-generator').append(output);
                })
            })
        },
        error: function(error) {
            //console.log("error", error)
        }
    })
}

function ProjectDetail() {
    data = {
        projectID: projectID
    }
    $.ajax({
        url: "https://projectstack.now.sh/project/info",
        type: "POST",
        data: data,
        dataType: "json",
        success: async function(result) {
            //console.log("success", result)
            $('.projectName').html(result.projectName);
            $('div.ownerID').html(result.ownerID)
            $('a.ownerID').attr('href', '/profile/' + result.ownerID);
            temp = result.members;
            for (var i = 0; i < temp.length; i++) {
                const val = temp[i];
                await $.get('../generator/collaborator-card-mustache.html', (html) => {
                    var output = Mustache.render(html, { username: val });
                    $('#collaborator-generator').append(output);
                })
            }
            temp = result.content;
            for (var i = 0; i < temp.length; i++) {
                const val = temp[i];
                if ("title" in val) {
                    await $.get('../generator/project-detail-title-mustache.html', (html) => {
                        var output = Mustache.render(html, { title: val.title });
                        $('#project-detail-container').append(output);
                    })

                } else if ("paragraph" in val) {
                    await $.get('../generator/project-detail-paragraph-mustache.html', (html) => {
                        var output = Mustache.render(html, { paragraph: val.paragraph });
                        $('#project-detail-container').append(output);
                    })
                } else if ("img_url" in val) {
                    await $.get('../generator/project-detail-image-mustache.html', (html) => {
                        var output = Mustache.render(html, { img_url: val.img_url });
                        $('#project-detail-container').append(output);
                    })
                }
            }
            temp = result.requests;
            for (var i = 0; i < temp.length; i++) {
                const val = temp[i];
                await $.get('../generator/request-card-indiv-mustache.html', (html) => {
                    var output = Mustache.render(html, { username: val });
                    $('#request-indiv-generator').append(output);
                })
            }
            temp = result.requests_team;
            for (var i = 0; i < temp.length; i++) {
                const val = temp[i];
                await $.get('../generator/request-card-team-mustache.html', (html) => {
                    var output = Mustache.render(html, { username: val });
                    $('#request-team-generator').append(output);
                })
            }
            $('.ui.active.dimmer').css("display", "none");
        },
        error: function(error) {
            //console.log("error", error)
        }
    })
}

function clickRequestIndiv(username, accept) {
    data = {
        accept: accept,
        username: username,
        projectID: projectID
    }
    $.ajax({
        url: "https://projectstack.now.sh/project/resolverequest",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            //console.log("success", result)
            var url = window.location.href;
            window.location.href = url;
        },
        error: function(error) {
            //console.log("error", error)
        }
    })
}

function clickRequestTeam(teamID, accept) {
    data = {
        accept: accept,
        teamID: teamID,
        projectID: projectID
    }
    $.ajax({
        url: "https://projectstack.now.sh/project/resolverequest",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            //console.log("success", result)
            window.location.href = '/project/' + projectID;
        },
        error: function(error) {
            //console.log("error", error)
        }
    })
}

function JoinIndiv() {
    data = {
        username: cookie.username,
        projectID: projectID
    }
    $.ajax({
        url: "https://projectstack.now.sh/project/join",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            //console.log("success", result)
            window.location.href = '/project/' + projectID;
        },
        error: function(error) {
            //console.log("error", error)
        }
    })
}

function JoinAsTeam(teamID) {
    data = {
        teamID: teamID,
        projectID: projectID
    }
    $.ajax({
        url: "https://projectstack.now.sh/project/joinasteam",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            //console.log("success", result)
            var url = window.location.href;
            window.location.href = url;
        },
        error: function(error) {
            //console.log("error", error)
        }
    })
}

const projectID = getProjectID()
const cookie = getcookie();
if (!("username" in cookie)) {
    $('.guest').css('display', 'flex');
    $('.logged-in').css('display', 'none');
    $('.ui.grid.button-container').css('display', 'none');
    $('.edit').css('display', 'none');
    $('.pendding-request').css('display', 'none');
} else {
    $('.guest').css('display', 'none');
    $('.logged-in').css('display', 'flex');
    const ownerID = ""
    data = {
        projectID: projectID,
        fields: ['ownerID', 'requests', 'members']
    }
    $.ajax({
        url: "https://projectstack.now.sh/project/info",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(result) {
            //console.log("success", result)
            if (result.ownerID == cookie.username) {
                $('.edit').css('display', 'block');
                $('.pendding-request').css('display', 'block');
                $('.ui.grid.button-container').css('display', 'none');
            } else if (result.members.includes(cookie.username)) {
                $('.edit').css('display', 'none');
                $('.pendding-request').css('display', 'none');
                $('.ui.grid.button-container').css('display', 'none');
            } else if (result.requests.includes(cookie.username)) {
                $('.edit').css('display', 'none');
                $('.pendding-request').css('display', 'none');
                $('.ui.grid.button-container').css('display', 'none');
            } else {
                $('.edit').css('display', 'none');
                $('.pendding-request').css('display', 'none');
                $('.ui.grid.button-container').css('display', 'flex');
            }
        },
        error: function(error) {
            //console.log("error", error)
        }
    })
}
$('#username').html(cookie.username)
TeamCard();
TrendingCard();
ProjectDetail();
//console.log(getProjectID());