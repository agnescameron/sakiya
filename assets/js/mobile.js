var pageDepth = 0;
var initialWidth = $(document).width();

function generateList(){
    var headings = ["SAKIYA", "Board", "Events", "Projects", "Curriculum", "Community"]
    for(i=0; i<headings.length; i++){
        makeDiv(headings[i], i);
  }
}

function nextPage(name){
    pageDepth+=1;
    //make room for next page
    $('#container').css({
        'width': (pageDepth+1)*initialWidth+'px',
    })

    //generate the next page
    $newpage = $('<div/>', {
        id: 'page' + pageDepth,
        class: "page",
    });

    $newpage.css({
        'background-color': 'yellow',
    }).appendTo( '#container' );

    $('html, body').animate({
        scrollLeft: $('#page'+pageDepth).offset().left
    }, 1000);

    console.log("scroll left is ", $('html, body').scrollLeft())

}

function makeDiv(name, number){
    // vary size for fun
    $newheading = $('<div/>', {
        id: name,
        class: "heading",
        click: function(){ nextPage(name); }
    });

    $newheading.css({
        'top': i*90 + 'px',
    }).appendTo( '#page0' );
    $newheading.html(name);
}

window.onload = function() {
    generateList();
}