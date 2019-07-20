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

    if ($( page ).length && $(page).attr('class') === 'textPage'){
        console.log('page is not null')
        $(page).empty();
    }
    else if ($( page ).length && $(page).attr('class') === 'menuPage'){
        console.log('page is not null, but was a text page')
        $(page).remove();
        $('<div/>', {
            id: 'page' + pageDepth,
            class: "textPage",
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
            class: "textPage",
            width: initialWidth + 'px',
        }).appendTo( '#container' );

    }

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