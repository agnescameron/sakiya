var pageDepth = 0;
var initialWidth = $(window).width();
var initialHeight = $(window).height();
var documentHeight = $(document).height();

console.log('initil width is ', initialWidth, 'initial height is ', initialHeight, 'document height is ', documentHeight)

function generateList(menu, page){

    if(menu.level === 1 || menu.contents.length === 1){
        console.log('level is 1')
        for(i=0; i<menu.contents.length; i++){
            console.log('i is ', i)
            $newheading = $('<div/>', {
            id: menu.contents[i].replace(/\s/g, ''),
            class: "heading",
            click: function(){ makeTextPage(this.id + 'Page', menu.level) }
        }).appendTo( page );

        if(lang === 'ar')
            $newheading.html(dictionary[menu.contents[i].replace(/\s/g, '')].ar);
        else
            $newheading.html(dictionary[menu.contents[i].replace(/\s/g, '')].en);
        }
    }

    else{
        $menuContainer = $('<div/>', {"class": "menuContainer"}).appendTo( page )

        for(i=0; i<menu.contents.length; i++){
            $newheading = $('<div/>', {
            id: menu.contents[i].replace(/\s/g, ''),
            class: "heading",
            click: function(){ makeMenuPage(this.id) }
        }).appendTo( $menuContainer );

        if(lang === 'ar')
            $newheading.html(dictionary[menu.contents[i].replace(/\s/g, '')].ar);
        else
            $newheading.html(dictionary[menu.contents[i].replace(/\s/g, '')].en);
        }
    }
}

function makeTextPage(title, parentLevel){
    // parent level + 1
    console.log('making text page for ', title)

    pageDepth=parentLevel+1;

    $('#container').css({
        'width': 10000 + 'px',
        'overflow-x': 'scroll',
    })
    //generate the next page
    $newpage = $('<div/>', {
        id: 'page' + pageDepth,
        class: "page",
        width: initialWidth + 'px',
    }).appendTo( '#container' );

    page = '#page'+pageDepth;

    $(page).empty();

    $divTitle = $('<div/>', {
        id: title,
        class: 'pageTitle'    
    })
    .css({
        width: initialWidth-10 + 'px',
    })
    .html(dictionary[title].en.title)
    .appendTo( page );

    $divContents = $('<p/>', {
        id: title,
        class: 'textbox'
    })
    .css({
        width: initialWidth-10 + 'px',
    })
    
    .appendTo( page );

    if(lang === 'en'){
        $divTitle.html(dictionary[title].en.title)
        $divContents.html(dictionary[title].en.contents)
    }

    else{
        $divTitle.html(dictionary[title].ar.title)
        $divContents.html(dictionary[title].ar.contents)
    }

    $('body').animate({
        scrollLeft: ($('#page'+pageDepth).offset()).left
    }, 1000);
}

function makeMenuPage(name){
    console.log("making menu page ", name)

    pageDepth=menus[name].level;

    $('#container').css({
        'width': initialWidth*2 + 'px',
    })
    //generate the next page
    $newpage = $('<div/>', {
        id: 'page' + pageDepth,
        class: "page",
    })
    .css({
        'width': initialWidth+ 'px'
    })
    .appendTo( '#container' );


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
    generateList(menus["main"], '#page0');
    
    //v weird fix, to reset scroll position on load
    //
    $('body').animate({
        scrollLeft: 0
    }, 1);
    document.body.style.height = initialHeight + "px";
    console.log($(document).height())
}