var adminAnchor = false
function toggleNav() {
    if ($(".sidenav").css("width") > "0px") {
        $(".sidenav").css("width", "0em");
    } else {
        $(".sidenav").css("width", "15.625em");
    }
}

function adminCheck(){
    var kode = prompt("Hvad er postkoden?").toLowerCase();
    var fullData = JSON.parse(localStorage.getItem("fullData"));
    for(var i = 0; i < fullData.poster.length; i++){
        for(var u = 0; u < fullData.poster[i].poster.length; u++){
            if(kode == fullData.poster[i].poster[u][1]){
                localStorage.setItem("post", fullData.poster[i].name + " " + fullData.poster[i].poster[u][0]);
                localStorage.setItem("postIndex", i+","+u);
                window.location = "admin.html";
            }
        }
    }
    load();
}

$(setTimeout(load, 10));
$(setTimeout(setMargin, 100));

function load() {
    //$("#nav").load('navigation.html');
}

function setMargin() {
    var margin = $('.icon-bar').css('height');
    $('.sidenav').css('margin-bottom', margin);
    $('#lastmenu').css('margin-bottom', margin);
    $('#main').css('margin-bottom', margin);
}

$(document).mouseup(function (e) {
    var el = $(".sidenav");

    if (!el.is(e.target) && el.has(e.target).length === 0) {
        el.css("width", "0em");
    }
});
