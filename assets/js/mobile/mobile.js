var pageDepth = 0;
var initialWidth = $(window).width();
var initialHeight = $(window).height();
var documentHeight = $(document).height();

console.log('initil width is ', initialWidth, 'initial height is ', initialHeight, 'document height is ', documentHeight)

function returnToMain() {
    console.log('returning')

    $('body').animate({
        scrollLeft: 0
    }, 1000);

}

function generateList(menu, page){

    $menuContainer = $('<div/>', {"class": "menuContainer"}).appendTo( page )

    if(menu.level === 1 || menu.contents.length === 1){
        console.log('level is 1')
        for(i=0; i<menu.contents.length; i++){
            console.log('i is ', i)
            $newheading = $('<div/>', {
            id: menu.contents[i].replace(/\s/g, ''),
            class: "heading",
            click: function(){ makeTextPage(this.id + 'Page', menu.level) }
        }).appendTo( $menuContainer );



        if(lang === 'ar')
            $newheading.attr({lang: 'ar'}).html(dictionary[menu.contents[i].replace(/\s/g, '')]['heading-ar']);
        else
            $newheading.attr({lang: 'en'}).html(dictionary[menu.contents[i].replace(/\s/g, '')]['heading-en']);
        }
    }

    else{

        for(i=0; i<menu.contents.length; i++){
            console.log("menu is ", menu.contents[i], "dictionayr entry is ", dictionary[menu.contents[i].replace(/\s/g, '')])
            $newheading = $('<div/>', {
            id: menu.contents[i].replace(/\s/g, ''),
            class: "heading",
            click: function(){ makeMenuPage(this.id) }
        }).appendTo( $menuContainer );

        if(lang === 'ar')
            $newheading.attr({lang: 'ar'}).html(dictionary[menu.contents[i].replace(/\s/g, '')]['heading-ar']);
        else
            $newheading.attr({lang: 'en'}).html(dictionary[menu.contents[i].replace(/\s/g, '')]['heading-en']);
        }
    }
}

function makeTextPage(title, parentLevel){
    // parent level + 1
    console.log('making text page for ', title)

    pageDepth=parentLevel+1;

    $('#container').css({
        'width': initialWidth*(pageDepth+1) + 10 + 'px',
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
        id: title + 'Title',
        class: 'pageTitle'    
    })
    .html(dictionary[title]["heading-en"])
    .appendTo( page );

    $divContents = $('<p/>', {
        id: title,
        class: 'textbox'
    })
    .appendTo( page );

    $('<div/>', {
        class: 'bottomImage',
        click: (function(){ returnToMain() } ),
    }).appendTo( page );

    $('<div/>', {
        id: 'backButton',
        click: (function(){ returnToMain() } ),
    }).appendTo( page );

    //perhaps change to translateDiv?
    if(lang === 'en'){
        $divTitle.attr({lang: 'en'}).html(dictionary[title]["heading-en"])
        $divContents.attr({lang: 'en'}).html(dictionary[title]["contents-en"])
    }

    else{
        $divTitle.attr({lang: 'ar'}).html(dictionary[title]["heading-ar"])
        $divContents.attr({lang: 'ar'}).html(dictionary[title]["contents-ar"])
    }

    $('body').animate({
        scrollLeft: ($('#page'+pageDepth).offset()).left
    }, 1000);
}

function makeMenuPage(name){
    console.log("making menu page ", name)

    pageDepth=menus[name].level;

    $('#container').css({
        'width': initialWidth*(pageDepth+1) + 'px',
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
    //v weird fix, to reset scroll position on load
    //
    $('body').animate({
        scrollLeft: 0
    }, 1);
    document.body.style.height = initialHeight + "px";
    console.log($(document).height())

    getDictionary.then(function(value) {
        console.log('got dictionary')
        generateList(menus["main"], '#page0');
    });

    getEvents.then(function(value) {
        console.log(value);
    });
}