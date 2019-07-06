var pageDepth = 0;
var initialWidth = $(window).width();
var initialHeight = $(window).height();

function generateList(menu, page){

    if(menu.level === 1 || menu.contents.length === 1){
        console.log('level is 1')
        for(i=0; i<menu.contents.length; i++){
            console.log('i is ', i)
            $newheading = $('<div/>', {
            id: menu.contents[i].replace(/\s/g, ''),
            class: "heading",
            click: function(){ makeTextPage(this.id, menu.level) }
        }).appendTo( page );

        $newheading.html(menu.contents[i]);
        }
    }

    else{
        console.log('else')
        for(i=0; i<menu.contents.length; i++){
            $newheading = $('<div/>', {
            id: menu.contents[i].replace(/\s/g, ''),
            class: "heading",
            click: function(){ makeMenuPage(this.id) }
        }).appendTo( page );

        $newheading.html(menu.contents[i]);
        }
    }
}

function makeTextPage(title, parentLevel){
    // parent level + 1
    pageDepth=parentLevel+1;

    $('#container').css({
        'overflow-x': 'scroll'
    })
    //generate the next page
    $newpage = $('<div/>', {
        id: 'page' + pageDepth,
        class: "page",
    }).appendTo( '#container' );

    page = '#page'+pageDepth;

    $(page).empty();

    $('<div/>', {
        id: title,
        class: 'pageTitle'    
    })
    .css({
        width: initialWidth,
    })
    .html(pages[title].title)
    .appendTo( page );

    $('<p/>', {
        id: title,
        class: 'textbox'
    })
    .css({
        width: initialWidth,
    })
    .html(pages[title].contents)
    .appendTo( page );

    $('body').animate({
        scrollLeft: ($('#page'+pageDepth).offset()).left
    }, 1000);
}


function makeMenuPage(name){
    console.log("making menu page ", name)

    pageDepth=menus[name].level;

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

    generateList( menus[name] , '#page'+pageDepth)

    $('body').animate({
        scrollLeft: ($('#page'+pageDepth).offset()).left
    }, 1000);
}

window.onload = function() {
    $('#container').css({
        'overflow-x': 'hidden'
    })
    generateList(menus["main"], '#page0');
    
    //v weird fix, to reset scroll position on load
    //
    $('body').animate({
        scrollLeft: 0
    }, 1);

    console.log("scrolleft is now ", $('body').scrollLeft())

}