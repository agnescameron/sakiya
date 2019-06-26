var pageDepth = 0;
var menus = {
    "mainMenu":{
        "level":0,
        "menu": ["SAKIYA", "Board", "Events", "Projects", "Curriculum", "Friends", "Community"],
    },
    "BoardMenu": {
        "level": 1,
        "menu": ["Sahar Qawasmi", "Nida Sinnokrot"],
    },
    "EventsMenu": {
        "level": 1,
        "menu":["current", "past"]
    },
    "ProjectsMenu": {
        "level": 1,
        "menu":["current", "past"],
    },
    "FriendsMenu": {
        "level": 1,
        "menu":["friend1", "friend2"],
    }
}

var initialWidth = $(window).width();
var initialHeight = $(window).height();

function generateList(headings, page){
    for(i=0; i<headings.length; i++){
        $newheading = $('<div/>', {
        id: headings[i],
        class: "heading",
        click: function(){ makePage(this.id) }
    }).appendTo( page );
    $newheading.html(headings[i]);
  }
}

function makePage(name){
    pageDepth=menus[name+'Menu'].level;

    $('#container').css({
        'overflow-x': 'scroll'
    })
    //generate the next page
    $newpage = $('<div/>', {
        id: 'page' + pageDepth,
        class: "page",
    }).appendTo( '#container' );


    offset = ($('#'+name).offset()).top - parseInt($('#page'+pageDepth).css('padding-top'));

    $offsetDiv = $('<div/>', {
        id: 'offset'+pageDepth,
        class: "offset",
    }).css({
        height: offset,
    });

    $( '#page'+pageDepth ).html($offsetDiv);

    generateList( menus[name+'Menu'].menu , '#page'+pageDepth)

    $('body').animate({
        scrollLeft: ($('#page'+pageDepth).offset()).left
    }, 1000);
    console.log("scrolleft is now ", $('html, body').scrollLeft())
}

window.onload = function() {
        $('#container').css({
        'overflow-x': 'hidden'
    })
    generateList(menus["mainMenu"].menu, '#page0');
    
    //v weird fix, to reset scroll position on load
    //
    $('body').animate({
        scrollLeft: 0
    }, 1);

    console.log("scrolleft is now ", $('body').scrollLeft())

}