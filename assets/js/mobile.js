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
    console.log("pageDepth")
    //make room for next page
    console.log('page 0 width ', $('#page0').width())

    $('#container').css({
        // 'width': (pageDepth+1)*initialWidth+'px',
        'overflow-x': 'scroll'
    })
    //generate the next page
    $newpage = $('<div/>', {
        id: 'page' + pageDepth,
        class: "page",
    }).appendTo( '#container' );

    $offset = $('<div/>', {
        id: 'offset'+pageDepth,
        class: "offset",
    }).css({
        height: ($('#'+name).offset()).top,
    });

    $( '#page'+pageDepth ).html($offset);

    generateList( menus[name+'Menu'].menu , '#page'+pageDepth)

    $('html, body').animate({
        scrollLeft: ($('#page'+pageDepth).offset()).left
    }, 1000);

    console.log("scroll left is ", $('html, body').scrollLeft())

}

window.onload = function() {
    generateList(menus["mainMenu"].menu, '#page0');
    
}