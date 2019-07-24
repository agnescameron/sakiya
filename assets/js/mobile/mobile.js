var pageDepth = 0;
var initialWidth = $(window).width();
var initialHeight = $(window).height();
var documentHeight = $(document).height();
jQuery.fx.interval = 10;

function returnToMain() {
    $('body').animate({
        scrollLeft: 0
    }, 1000);

}

function generateList(menu, page){
    //need to check if already exists
    if(menu.level === 1 || menu.contents.length === 1){
        for(i=0; i<menu.contents.length; i++){
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
        $(`.eventBackButton`).css({'float': 'left'})  
        $('#'+title+'Contents').css({direction: 'rtl'}).attr({lang: 'ar'})
    }
}

function addTeam(page, title) {
    $('<div/>', {
        id: title+'PageTitle',
        class: 'eventPageTitle',
    }).html(dictionary[title]["heading-en"])
    .appendTo( page );

    $teamContainer = $('<div/>', {
        id: title,
        class: 'textPageBody'
    })
    .appendTo( page );


    for (i=0; i<Object.keys(teamData).length; i++){    
        var key = Object.keys(teamData)[i]

        $name = $('<div/>', {
            id: key + 'Name',
            class: 'pageTitle',
            lang: lang,
        })
        .html(teamData[key]["name-"+lang]);

        $title = $('<div/>', {
            id: key + 'Title',
            class: 'pageSubTitle',
        })
        .html(teamData[key]["title-"+lang]);

        $bio = $('<p/>', {
            id: key + 'Bio',
            lang: lang,
        })
        .css({'margin-bottom': '30px'})
        .html(teamData[key]["bio-"+lang]);

        $teamContainer.append([$name, $title, $bio])
        //for each person in team, add to page
    }
}

function addResidencies(page, title) {
    $('<div/>', {
        id: title+'PageTitle',
        class: 'eventPageTitle',
    }).html(dictionary[title]["heading-en"])
    .appendTo( page );

    $residentsContainer = $('<p/>', {
        id: title,
        class: 'eventPageBody'
    })
    .appendTo( page );
    
    var residencies = getEntries(residenciesData, "group", title);

    for (i=0; i<Object.keys(residencies).length; i++){
        var key = Object.keys(residencies)[i].slice(0, -4);
        var residencyTitle = (lang === 'en') ? residencies[key+'Page']["heading-en"] : residencies[key+'Page']["heading-ar"];
        var image = residencies[key+'Page'].img[0].location;


        $residentBox = $('<div/>', {
            id: key,
            class: 'eventBox',
            click: (function(){ $('.pageContainer').remove(); addPage(residencies, this.id); } ),
            lang: lang,
        })
        .css({'background-image': `url(${image})`, 'background-size': 'cover', 'height': '100px'})
        .appendTo( $residentsContainer );
    
        $('<div/>', {
            id: key+'PageTitle',
            class: 'eventBoxTitle',
            lang: lang,
        }).html(residencyTitle)
        .appendTo( $residentBox );

        if(lang === 'ar') {
            $('#'+key+'Title').css({direction: 'rtl'}).attr({lang: 'ar'})
            $('#'+key+'Date').css({direction: 'rtl'}).attr({lang: 'ar'})
        }
    
    }

    if (Object.keys(residencies).length === 0){

        var noResidents = dictionary["noResidents"]["heading-"+lang]
        var direction = (lang === 'ar') ? 'rtl' : 'ltr' 

        $('<p/>', {
            id: 'noResidents',
            class: 'textPageBody',
            lang: lang,
        })
        .html(noResidents)
        .appendTo($residentsContainer);
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
            id: title + 'imageContainer',
            class: 'imageContainer',
            click: function(){ showMobileImage(this.id, title)  }

        }).appendTo( $imageBox );

        for(i=0; i<dictionary[title].img.length; i++) {
                $(`<img src= ${dictionary[title].img[i].location} class="bottomImage" style="width: 100%"/>`)
                //.attr({ click: function(){ showMobileImage(this.id) }})
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
    pageDepth=parentLevel+1;
    nextPage = pageDepth+1;

    $('#container').css({
        'width': initialWidth*(pageDepth+1) + 10 + 'px',
        'overflow-x': 'scroll',
    })

    page = '#page' + pageDepth;

    //gets rid of text pages further up
    if($('#page'+nextPage).length){
        $('#page'+nextPage).remove();
    }

    var pageClass = (dictionary[title].type === 'page') ? "textPage" : "eventPage";

    if ($( page ).length){
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

    else if (dictionary[title].type === 'eventsPage')
        addEvents(page, title.slice(0, -4));

    else if (dictionary[title].type === 'residencyPage')
        addResidencies(page, title.slice(0, -4));

    else if (dictionary[title].type === 'teamPage')
        addTeam(page, title.slice(0, -4));

    $('body').animate({
        scrollLeft: ($('#page'+pageDepth).offset()).left
    }, 1000);
}

function makeMenuPage(name){

    pageDepth=menus[name].level;

    $('#container').css({
        'width': initialWidth*(pageDepth+1) + 'px',
    })
    page = '#page' + pageDepth;

    if ($( page ).length && $(page).attr('class') === 'menuPage'){
        $(page).empty();
    }
    else if ($( page ).length && $(page).attr('class') !== 'menuPage'){
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

    $('body').animate({
        scrollLeft: ($('#page'+pageDepth).offset()).left
    }, 1000);
}

window.onload = function() {

    $('body').animate({
        scrollLeft: 0
    }, 1);
    document.body.style.height = initialHeight + "px";

    getDictionary.then(function(value) {
        generateList(menus["main"], '#page0');
        console.log('got dictionary')
    });

    getEvents;
    getResidencies;
    getTeam;
}