var pageDepth = 0;
var initialWidth = $(window).width();
var initialHeight = $(window).height();

function generateList(){
    var headings = ["SAKIYA", "Board", "Events", "Projects", "Curriculum", "Community"]
    for(i=0; i<headings.length; i++){
        makeDiv(headings[i], i);
  }
}

function makePage(name){
    pageDepth+=1;
    //make room for next page
    console.log('page 0 width ', $('#page0').width())

    $('#container').css({
        // 'width': (pageDepth+1)*initialWidth+'px',
        'overflow-x': 'scroll'
    })

    console.log('initial width is ', initialWidth, 'calculated width is ', (pageDepth+1)*initialWidth,
        'new width is ', $('#container').width(), 'document width is ', $(window).width())

    //generate the next page
    $newpage = $('<div/>', {
        id: 'page' + pageDepth,
        class: "page",
    });

    $newpage.css({
        'background-color': 'yellow',
    }).appendTo( '#container' );

    $('html, body').animate({
        scrollLeft: ($('#page'+pageDepth).offset()).left
    }, 1000);

    console.log("scroll left is ", $('html, body').scrollLeft())

}

function makeDiv(name, number){
    // vary size for fun
    $newheading = $('<div/>', {
        id: name,
        class: "heading",
        click: function(){ makePage(name); }
    });

    $newheading.css({
        'top': i*90 + 'px',
    }).appendTo( '#page0' );
    $newheading.html(name);
}

window.onload = function() {
    generateList();
}