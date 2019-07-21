var pageDepth = 0;
var initialWidth = $(window).width();
var initialHeight = $(window).height();
var documentHeight = $(document).height();
jQuery.fx.interval = 10;

console.log('initil width is ', initialWidth, 'initial height is ', initialHeight, 'document height is ', documentHeight)

function returnToMain() {
    console.log('returning')

    $('body').animate({
        scrollLeft: 0
    }, 1000);

}

function generateList(menu, page){
    //need to check if already exists
    console.log("generating list for page ", page)
    if(menu.level === 1 || menu.contents.length === 1){
        for(i=0; i<menu.contents.length; i++){
            console.log('i is ', i)
            $newheading = $('<div/>', {
            id: menu.contents[i].replace(/\s/g, ''),
            class: "heading",
            click: function(){ makeTextPage(this.id + 'Page', menu.level) }
        }).appendTo( page );



        if(lang === 'ar')
            $newheading.attr({lang: 'ar'}).html(dictionary[menu.contents[i].replace(/\s/g, '')]['heading-ar']);
        else
            $newheading.attr({lang: 'en'}).html(dictionary[menu.contents[i].replace(/\s/g, '')]['heading-en']);
        }
    }

    else{
        $menuBody = $('<div/>', {"class": "menuPageBody"}).appendTo( page )
        for(i=0; i<menu.contents.length; i++){
            var menuID = menu.contents[i].replace(/\s/g, '');
            $newheading = $('<div/>', {
            id: menuID,
            class: "heading",
            click: (menus[menuID].type === "text") ?  function(){ makeTextPage(this.id+ 'Page', menu.level) } : function(){ makeMenuPage(this.id) }
        }).appendTo( $menuBody );

        if(lang === 'ar')
            $newheading.attr({lang: 'ar'}).html(dictionary[menuID]['heading-ar']);
        else
            $newheading.attr({lang: 'en'}).html(dictionary[menuID]['heading-en']);
        }
    }
}

async function closeEvent(title) {

    // $('#'+title)
    // .animate({
    //     'height': '250px'
    // });

    $('#' + title + 'Back').remove();

    $('.eventText').remove();
    //$('#'+title+'Contents').remove();

    await sleep(100);
    $('#'+title).click(function(){ openEvent(title) } )

}

function openEvent(title) {
    $('#'+title)
    .unbind("click")
    .animate({
        // 'height': '400px'
    })

    $('<div/>', {
        id: title + 'Back',
        class: 'eventBackButton',
        click: (function(){ closeEvent(title) } ),
    })
    .css({'z-index': '50'})
    .prependTo( $('#'+title) );

    var eventContents = (lang === 'en') ? eventsData[title]["contents-en"] : eventsData[title]["contents-ar"];

    $('<div/>', {
        id: title+'Contents',
        class: 'eventText',
    }).html(eventContents)
    .appendTo( $('#'+title) )

    if( lang === 'ar'){
        console.log('floating')
        $(`.eventBackButton`).css({'float': 'left'})  
        $('#'+title+'Contents').css({direction: 'rtl'}).attr({lang: 'ar'})
    }
}

function addEvents(page, title) {

    $('<div/>', {
        id: title+'PageTitle',
        class: 'eventPageTitle',
    }).html(dictionary[title]["heading-en"])
    .appendTo( page );

    $eventsContainer = $('<p/>', {
        id: title,
        class: 'eventPageBody'
    })
    .appendTo( page );
    
    var events = getEntries(eventsData, "type", title);
    console.log(events)

    for (i=0; i<Object.keys(events).length; i++){
        var key = Object.keys(events)[i];
        var eventDate = new Date(events[key]["date"]);
        var eventTitle = (lang === 'en') ? events[key]["heading-en"] : events[key]["heading-ar"];

        $eventBox = $('<div/>', {
            id: key,
            class: 'eventBox',
            click: (function(){ openEvent(this.id) } ),
        })
        .appendTo( $eventsContainer );
    
        $('<div/>', {
            id: key+'Title',
            class: 'eventBoxTitle',
        }).html(eventTitle)
        .appendTo( $eventBox );

        $('<div/>', {
            id: key+'Date',
            class: 'eventBoxDate',
        }).html(eventDate.getDate() + '.' + eventDate.getMonth() + '.' + eventDate.getFullYear())
        .appendTo( $eventBox );
    
    }

}

function addText (page, title) {
    $divTitle = $('<div/>', {
        id: title + 'Title',
        class: 'textPageTitle'    
    })
    .html(dictionary[title]["heading-en"])
    .appendTo( page );

    $divContents = $('<p/>', {
        id: title,
        class: 'textPageBody'
    })
    .appendTo( page );

    if(dictionary[title].img){

        $imageBox = $('<div/>', {
            class: 'textPageImageBox',
        }).appendTo( page );

         $imageContainer = $('<div/>', {
            class: 'imageContainer',
        }).appendTo( $imageBox );

        for(i=0; i<dictionary[title].img.length; i++) {
                $(`<img src= ${dictionary[title].img[i].location} class="bottomImage" style="width: 100%"/>`)
                .appendTo( $imageContainer )
        }    

    }


    $('<div/>', {
        // id: 'backButton',
        class: 'textPageFooter',
        click: (function(){ returnToMain() } ),
    }).appendTo( page );


    //perhaps change to translateDiv?
    if(lang === 'en'){
        $divTitle.attr({lang: 'en'}).html(dictionary[title]["heading-en"])
        $divContents.attr({lang: 'en'}).html(dictionary[title]["contents-en"])
    }

    else{
        $divTitle.attr({lang: 'ar'}).html(`<p>`+dictionary[title]["heading-ar"]+'</p>')
        $divContents.attr({lang: 'ar'}).html(`<p>`+dictionary[title]["contents-ar"]+'</p>')
    }    
}

function makeTextPage(title, parentLevel){
    // parent level + 1
    console.log('making text page for ', title)

    pageDepth=parentLevel+1;
    nextPage = pageDepth+1;

    $('#container').css({
        'width': initialWidth*(pageDepth+1) + 10 + 'px',
        'overflow-x': 'scroll',
    })
    console.log('page depth is', pageDepth, "container width is ", $('#container').width(), "body is", $('body').width())

    page = '#page' + pageDepth;

    //gets rid of text pages further up
    if($('#page'+nextPage).length){
        console.log('bigger number page')
        $('#page'+nextPage).remove();
    }

    var pageClass = (dictionary[title].type === 'page') ? "textPage" : "eventPage";

    // if ($( page ).length && $(page).attr('class') === 'textPage'){
    //     console.log('page is not null')
    //     $(page).empty();
    // }

//    else if ($( page ).length && $(page).attr('class') === 'menuPage'){
    if ($( page ).length){
        console.log('page is not null, but was a text page')
        $(page).remove();
        $('<div/>', {
            id: 'page' + pageDepth,
            class: pageClass,
        })
        .css({
            'width': initialWidth+ 'px'
        })
        .appendTo( '#container' );

    }      
    else{
        //generate the next page
        $('<div/>', {
            id: 'page' + pageDepth,
            class: pageClass,
            width: initialWidth + 'px',
        }).appendTo( '#container' );

    }

    if(dictionary[title].type === 'page')
        addText(page, title)

    else
        addEvents(page, title.slice(0, -4))

    $('body').animate({
        scrollLeft: ($('#page'+pageDepth).offset()).left
    }, 1000);
}

function makeMenuPage(name){

    pageDepth=menus[name].level;

    $('#container').css({
        'width': initialWidth*(pageDepth+1) + 'px',
    })
    console.log("making menu page ", name, "pageDepth is ", pageDepth, "container width is", $('#container').width())

    page = '#page' + pageDepth;

    if ($( page ).length && $(page).attr('class') === 'menuPage'){
        console.log('page is not null, and is a menu page')
        $(page).empty();
    }
    else if ($( page ).length && $(page).attr('class') === 'textPage'){
        console.log('page is not null, but was a text page')
        $(page).remove();
        $('<div/>', {
            id: 'page' + pageDepth,
            class: "menuPage",
        })
        .css({
            'width': initialWidth+ 'px'
        })
        .appendTo( '#container' );

    }    
    else{
        console.log('page is null')
        //generate the next page
        $('<div/>', {
            id: 'page' + pageDepth,
            class: "menuPage",
        })
        .css({
            'width': initialWidth+ 'px'
        })
        .appendTo( '#container' );
    }


    $menuPageBody = $('<div/>', {
        id: 'pageBody'+pageDepth,
        class: "menuPageBody",
    })
    .appendTo( page );

    offset = ($('#'+name).offset()).top - parseInt($('#page'+pageDepth).css('padding-top'));

    $offsetDiv = $('<div/>', {
        id: 'offset'+pageDepth,
        class: "offset",
    }).css({
        height: offset,
    }).appendTo($menuPageBody)

    $( '#page'+pageDepth ).html($menuPageBody);

    generateList( menus[name] , '#pageBody'+pageDepth)

    // $('<div/>', {"class": "menuPageFooter"}).appendTo(page)
    $('body').animate({
        scrollLeft: ($('#page'+pageDepth).offset()).left
    }, 1000);
}

window.onload = function() {

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