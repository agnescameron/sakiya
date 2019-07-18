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
    //need to check if already exists
    console.log("generating list for page ", page)
    if(menu.level === 1 || menu.contents.length === 1){
        console.log("should be mking text page for ")
        console.log('level is 1')
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
        //need to account for non-
        $menuBody = $('<div/>', {"class": "menuPageBody"}).appendTo( page )
        for(i=0; i<menu.contents.length; i++){
            var menuID = menu.contents[i].replace(/\s/g, '');
            $newheading = $('<div/>', {
            id: menuID,
            class: "heading",
            click: (menus[menuID].type === "text") ?  function(){ makeTextPage(this.id) } : function(){ makeMenuPage(this.id) }
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

    console.log('page depth is', pageDepth)

    $('#container').css({
        'width': initialWidth*(pageDepth+1) + 10 + 'px',
        'overflow-x': 'scroll',
    })
    //generate the next page
    $newpage = $('<div/>', {
        id: 'page' + pageDepth,
        class: "textPage",
        width: initialWidth + 'px',
    }).appendTo( '#container' );

    page = '#page'+pageDepth;

    $(page).empty();

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
    console.log("making menu page ", name)

    pageDepth=menus[name].level;

    $('#container').css({
        'width': initialWidth*(pageDepth+1) + 'px',
    })
    //generate the next page
    $menuPage = $('<div/>', {
        id: 'page' + pageDepth,
        class: "menuPage",
    })
    .css({
        'width': initialWidth+ 'px'
    })
    .appendTo( '#container' );

    page = '#page'+pageDepth;

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