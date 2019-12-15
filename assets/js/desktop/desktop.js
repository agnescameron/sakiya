window.pageMode = false;

var fields = 7;

async function returnToMain () {
    $('.pageContainer').remove();
    $('.eventPageContainer-'+lang).remove();
    $('#mainMenuContainer').remove();
    $('#subMenuContainer').remove();    
    $('#imageContainer').remove();
    $('#residencyImageContainer').remove();
    $('.logoContainer').hide();
    $('.socialContainer').hide();


    var styleSheet;
    for (var i = 0; i < document.styleSheets.length; i++){
        var sheet = document.styleSheets[i]
        //need to find a good way to ref this for online 
        if(sheet.href){
            if(sheet.href.includes("frames.css"))
                styleSheet = sheet;
        }
    }
    $('.subframe').show();

    //for all divs with class "frame"
     $('.frame').each(function(){
        var frameRules = styleSheet.rules;

        frame = '#' + this.id;

        for (var j = 0; j < frameRules.length; j++){
            if (frameRules[j].selectorText && frameRules[j].selectorText.toLowerCase() === frame){
                $('#' + this.id).animate({
                    "top":frameRules[j].style.top,
                    "left":frameRules[j].style.left,
                    "position":'absolute'
                }, 1000);
                $('#' + this.id).children().animate({
                    "left": Math.random()*50 + 'px',
                    "top":Math.random()*50 + 'px',
                }, 1000);

            }
        }

    });

     $('.subframe').each(function(){
        var frameRules = styleSheet.rules;

        frame = '#' + this.id;

        for (var j = 0; j < frameRules.length; j++){
            if (frameRules[j].selectorText && frameRules[j].selectorText.toLowerCase() === frame){
                $('#' + this.id).animate({
                    "top":frameRules[j].style.top,
                    "left":frameRules[j].style.left,
                    "position":'absolute',
                }, 1000);
                $('#' + this.id).children()
                .animate({
                    "left": Math.random()*50 + 'px',
                    "top":Math.random()*50 + 'px',
                }, 1000);

            }
        }

    });

    if(window.pageMode === true){ 
        rotate($('#logo'), 90);
    }
    
    //need to make this async
    window.pageMode = false;
    await sleep(1100);
    drawTree();

}

async function showSpecificEvent(title) {
    //show event page
    showPage(dictionary, "upcomingevents");
    openEvent(title);
}

function toggleSideMenu(title) {
    $('.pageContainer').remove();
    $('#imageContainer').remove();
    $('.eventPageContainer-'+lang).remove();

    parentFrame = $('#'+title).parent().attr('id').charAt(5);

    var mainOffset = $("#mainMenuContainer").offset().left + 20;
    var subOffset = $("#subMenuContainer").offset().left;
    var padding = (lang === 'en') ? 20 : -20

    for(i=0; i<menus["main"].contents.length; i++){
    var mainMenuItem = menus["main"].contents[i].replace(/\s/g, '');
        //change for ar vs en

    var leftIndent = (mainMenuItem === title) ? mainOffset + padding : mainOffset;
   
   var color = (mainMenuItem === title) ? 'yellow' : 'white';


    (lang === 'en') ? $( '#' + mainMenuItem).animate({'left': '10px'}, 800) : $( '#' + mainMenuItem).animate({'right': '100px'}, 800)


    $( '#' + mainMenuItem).parent().animate({'left': leftIndent}, 500);  
    $( '#' + mainMenuItem).css({"color": color })  
    }

    var i = 0;
    $(`*[id^=frame${parentFrame}].subframe`).each(function() {
        var color = (this.id === $('#' + title).parent().attr('id')) ? 'yellow' : 'white';

        var topOffset = 110 + 70*parentFrame;
        $div = $('#' + $(this).attr('id'))
        $div.children().attr('id')

        if(lang === 'en')
            $div.children().css({'left': '35px', 'right': ''}, 800)

        else
            $div.children().css({ 'left': '', 'right': '10px'}, 800)

        $div.css({'left': subOffset}, 800)
        $div.css({'top': topOffset + 50*i + 'px'}, 800)
        $div.children().css({'top': '10px'}, 800)     

        $div.css({"color": color })

        $div.show()
        $div.children().show()
        $('#' + title).css({"color": color})

        if(dictionary[$div.children(0).attr("id")].type === "link" ) {
            $div.children().unbind('click');
            $div.children().click(function(){ window.location =dictionary[this.id].link });
        }

        i++;
    });  

    $('.textbox').remove();

    if((dictionary[title + 'Page'])){
        //add top level page description
        addTextPage(dictionary, title)
    }

    //else
    $(`:not(*[id^=frame${parentFrame}]).subframe`).hide()
}

function rotate(div, rotate){
    var elem = div;

    //get the current degree
    var currentDegree = 0;
    if(typeof(elem.attr('data-degree')) != 'undefined') {
        currentDegree += parseInt(elem.attr('data-degree'), 10);
    }

    //calculate the new degree
    var newDegree = currentDegree + rotate;

    //modify the elem css
    elem.css({ WebkitTransform: 'rotate(' + newDegree + 'deg)'});  
    elem.css({ '-moz-transform': 'rotate(' + newDegree + 'deg)'});
    elem.css('transform','rotate(' + newDegree + 'deg)');

    //store the degree for next time
    elem.attr('data-degree', newDegree);
}

function openEvent(title) {
    //get width of page container. 234 accounts for margins and borders

    $('.eventBoxDate').addClass('eventPageDate').removeClass('eventBoxDate')
    var containerWidth = $('.eventPageContainer-'+lang).width();
    numContainers = Math.floor(containerWidth/276);

    eventWidth = numContainers*276 - 26;

    $('#'+title).addClass('eventPage').removeClass('eventBox')
    .unbind("click")
    .animate({
        'height': '500px',
        'width': eventWidth})

    $header = $('<div/>', {
        class: 'eventPageHeader',
    })

    $('#' + title + 'Title').appendTo($header)

    $('<div/>', {
        id: title + 'Back',
        class: 'eventBackButton',
        click: (function(){ closeEvent(title) } ),
    })
    .css({'z-index': '50'})
    .prependTo( $header );

    $header.appendTo( $('#'+title) )

    var eventContents = (lang === 'en') ? eventsData[title]["contents-en"] : eventsData[title]["contents-ar"];

    $('<div/>', {
        id: title+'Contents',
        class: 'textCol',
        lang: lang,
    }).html(eventContents)
    .appendTo( $('#'+title) )

    $imgCol = $('<div/>', {
        id: 'img',
        class: 'imgCol',
        lang: lang,
        click: ( function(){ showImage(this.id, imgArray, eventsData) } ),
    })

    imgArray = eventsData[title].img;

    for(i=0; i<imgArray.length; i++) {
        $imgCol.append(`<img class='eventImage' src=${imgArray[i].location}/>`);
    }

    $imgCol.appendTo( $('#'+title) );

    if( lang === 'ar'){
        $(`.eventPage`).attr({lang: 'ar'}).css({'float': 'right'})  
        $(`.eventBackButton`).css({'float': 'left'})  
        $('#'+title+'Contents').css({direction: 'rtl'}).attr({lang: 'ar'})
    }

}

async function closeEvent(title) {
    $('#' + title + 'Title').prependTo('#' + title)
    $('eventPageDate').addClass('eventBoxDate').removeClass('eventPageDate')
    $('#'+title).addClass('eventBox').removeClass('eventPage')
    .animate({
        'height': '250px',
        'width': '250px'});

    $('#' + title + 'Back').remove();

    $('.eventText').remove();
    $('.imgCol').remove();
    $('.textCol').remove();

    await sleep(100);
    $('#'+title).click(function(){ openEvent(title) } )
}


function addArenaPage (title) {

    //make textbox
    $pageContainer = $('<div/>', {
        id: 'eventPageContainer',
        class: 'eventPageContainer-'+lang,
    });

    $backButton = $('<div/>', {
        class: 'backButton',
        click: (function(){ returnToMain() } ),
    });

    var channel;
    if(title === 'readings')
        channel = JSON.parse(curriculum);


    $pageHeader = $(`<div>`, {
        class: 'pageHeader',
    })

    $pageHeader.appendTo( $pageContainer );
    $pageHeader.append($backButton);

    $pageTitle = $('<div/>', {
        id: title + 'PageTitle',
        class: 'pageTitle',
        lang: lang,
    })
    .html('Sakiya Reading List');


    if(lang === 'en') {
        $pageTitle.css({direction: 'ltr'})
        $backButton.css({float: 'right'})
    }

    else {
        $pageTitle.css({direction: 'rtl'})
        $backButton.css({float: 'left'});
    }

    $pageTitle.appendTo( $pageHeader );

    console.log(channel)
    for(var i=0; i<channel["contents"].length; i++){
        var block = channel["contents"][i];
        if(block.image){
            $block = $('<div/>', {
                id: block.attachment.url,
                class: 'arenaBlock',
                click: (function() { openFile(this.id) })
            }).appendTo( $pageContainer )

            $blockImg = $('<div/>', {
                id: block.id,
                class: 'arenaBox',
            })
            .appendTo($block);
      
            $blockCaption = $('<p/>', {
                class: 'arenaCaption',
            }).html(block.title)
            .appendTo( $block );

            $blockImg.css({'background-image': `url(${block.image.square.url})`, 'background-size': 'cover'});
        }
    }

    $pageContainer.appendTo( '#mainContainer' );
}



function addNewsPage (title) {
    var news = newsData;

    //make textbox
    $pageContainer = $('<div/>', {
        id: title + 'PageContainer',
        class: 'pageContainer',
    });

    $backButton = $('<div/>', {
        class: 'backButton',
        click: (function(){ returnToMain() } ),
    });

    $textbox = $('<div/>', {
        class: 'textbox',
        lang: lang,
    })

    $pageHeader = $(`<div>`, {
        class: 'pageHeader',
    })

    $mainTitle = $(`<div>`, {
        id: title,
        class: 'pageTitle',
    }).html(dictionary[title]['heading-'+lang]+"<br/>")

    $pageHeader.append($backButton);
    $pageHeader.append($mainTitle);    
    $pageContainer.append($pageHeader);
    $pageContainer.append($textbox);

    for (i=0; i<Object.keys(news).length; i++){    
        var key = Object.keys(news)[i]

        $newsItem = $('<div/>', {
            lang: lang,
            class: 'newsItem',
        })

        $heading = $('<div/>', {
            id: key + 'Name',
            class: 'pageSubTitle',
            lang: lang,
        })
        .html(news[key]["heading-"+lang]);

        $date = $('<div/>', {
            id: key + 'Title',
            class: 'pageSubTitle',
        })
        .html(news[key]["date"]);

        $contents = $('<p/>', {
            id: key + 'News',
            // class: 'textbox',
            lang: lang,
        })
        .css({'margin-bottom': '30px'})
        .html(news[key]["contents-"+lang]);

        $newsItem.append([$heading, $date, $contents])

        $textbox.append($newsItem)
        //for each person in team, add to page
    }

    $pageContainer.appendTo( '#mainContainer' );

    if(lang === 'ar') {
        $('.pageTitle').css({direction: 'rtl'}).attr({lang: 'ar'});
        $('.pageSubTitle').css({direction: 'rtl'}).attr({lang: 'ar'});
        $('.backButton').css({'float': 'left'});
    }

}


function addTeamPage (title) {
    var team = getEntries(teamData, "type", title);

    //make textbox
    $pageContainer = $('<div/>', {
        id: title + 'PageContainer',
        class: 'pageContainer',
    });

    $backButton = $('<div/>', {
        class: 'backButton',
        click: (function(){ returnToMain() } ),
    });

    $textbox = $('<div/>', {
        class: 'textbox',
        lang: lang,
    })

    $pageHeader = $(`<div>`, {
        class: 'pageHeader',
    })

    $mainTitle = $(`<div>`, {
        id: title,
        class: 'pageTitle',
    }).html(dictionary[title]['heading-'+lang])

    $pageHeader.append($backButton);
    $pageHeader.append($mainTitle);    
    $pageContainer.append($pageHeader);
    $pageContainer.append($textbox);

    for (i=0; i<Object.keys(team).length; i++){    
        var key = Object.keys(team)[i]

        $name = $('<div/>', {
            id: key + 'Name',
            class: 'pageTitle',
            lang: lang,
        })
        .html(team[key]["name-"+lang]);

        $title = $('<div/>', {
            id: key + 'Title',
            class: 'pageSubTitle',
        })
        .html(team[key]["title-"+lang]);

        $bio = $('<p/>', {
            id: key + 'Bio',
            class: 'textbox',
            lang: lang,
        })
        .css({'margin-bottom': '30px'})
        .html(team[key]["bio-"+lang]);

        $textbox.append([$name, $title, $bio])
        //for each person in team, add to page
    }

    //if there are images to display
    if(dictionary[title + 'Page'].img){
        var imgArray = dictionary[title + 'Page'].img;

        $imageContainer = $('<div/>', {
            id: 'imageContainer',
            class: 'imageContainer-' + lang,
        });

        $imageContainer.appendTo( '#mainContainer' );   
             
        for(i=0; i<imgArray.length; i++) {
                $('<div/>', {
                    id: title + 'PageImage' + i,
                    class: 'sideImage',
                    click: (function(){ showImage(this.id, imgArray, dictionary) } ),
                })
                .prepend(`<img src= ${imgArray[i].location} style="width: 100%"/>`)
                .appendTo( $imageContainer )
        }
    }

    $pageContainer.appendTo( '#mainContainer' );

    if(lang === 'ar') {
        $('.pageTitle').css({direction: 'rtl'}).attr({lang: 'ar'});
        $('.pageSubTitle').css({direction: 'rtl'}).attr({lang: 'ar'});
        $('.backButton').css({'float': 'left'});
    }

}

function addResidencyPage(title) {
    var residencies = getEntries(residenciesData, "group", title);

    $pageContainer = $('<div/>', {
        id: title + 'PageContainer',
        class: 'pageContainer',
    });

    $imageContainer = $('<div/>', {
        id: 'residencyImageContainer',
        class: 'imageContainer-' + lang,
    });

    $backButton = $('<div/>', {
        class: 'backButton',
        click: (function(){ returnToMain() } ),
    });

    $pageContainer.append($backButton);

    for (i=0; i<Object.keys(residencies).length; i++){
        var key = Object.keys(residencies)[i].slice(0, -4);
        var residencyTitle = (lang === 'en') ? residencies[key+'Page']["heading-en"] : residencies[key+'Page']["heading-ar"];
        var image = residencies[key+'Page'].img[0].location;


        $residentBox = $('<div/>', {
            id: key,
            class: 'eventBox',
            click: (function(){ $('.pageContainer').remove(); addTextPage(residencies, this.id); } ),
            lang: lang,
        })
        .css({'background-image': `url(${image})`, 'background-size': 'cover'})
        .appendTo($pageContainer);
    
        $('<div/>', {
            id: key+'PageTitle',
            class: 'eventBoxTitle',
            lang: lang,
        }).html(residencyTitle)
        .appendTo( $residentBox );

        $pageContainer.appendTo( '#mainContainer' );

        if(lang === 'ar') {
            $('#'+key+'Title').css({direction: 'rtl'}).attr({lang: 'ar'});
            $('#'+key+'Date').css({direction: 'rtl'}).attr({lang: 'ar'});
        }

    }

    if (Object.keys(residencies).length === 0){

        var noResidents = dictionary["noResidents"]["contents-"+lang]
        var direction = (lang === 'ar') ? 'rtl' : 'ltr' 

        $('<p/>', {
            id: 'noResidents',
            class: 'textbox',
            lang: lang,
        })
        .css({'padding': '10px', 'direction': direction})
        .html(noResidents)
        .appendTo($pageContainer);

        $pageContainer.appendTo( '#mainContainer' );
    }

    if(lang === 'ar') $('.backButton').css({'float': 'left'});

    $imageContainer.appendTo( '#mainContainer' ); 

}


function addEventsPage(title) {
    var events = getEntries(eventsData, "type", title);

    $pageContainer = $('<div/>', {
        id: 'eventPageContainer',
        class: 'eventPageContainer-'+lang,
    });

    $imageContainer = $('<div/>', {
        id: 'imageContainer',
        class: 'imageContainer-' + lang,
    });

    for (i=0; i<Object.keys(events).length; i++){
        var key = Object.keys(events)[i];
        var eventDate = new Date(events[key]["date"]);
        var eventTitle = (lang === 'en') ? events[key]["heading-en"] : events[key]["heading-ar"];
        var randImage = illustrationArray[ i%(illustrationArray.length-1) ];

        $eventBox = $('<div/>', {
            id: key,
            class: 'eventBox',
            click: (function(){ openEvent(this.id) } ),
            lang: lang,            
        })
        .css({'background-image': `url(${randImage})`})
        .appendTo($pageContainer);
    
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

        $pageContainer.appendTo( '#mainContainer' );

        if(lang === 'ar') {
            $('#'+key+'Title').css({direction: 'rtl'}).attr({lang: 'ar'})
            $('#'+key+'Date').css({direction: 'rtl'}).attr({lang: 'ar'})
        }
    }
}

function addTextPage(pageArray, title) {
    $pageContainer = $('<div/>', {
        id: title + 'PageContainer',
        class: 'pageContainer',
    });

    $textbox = $('<p/>', {
        id: title + 'Page',
        class: 'textbox',        
        lang: lang,
    })
    .html(pageArray[title + 'Page']['contents-' + lang])

    if(lang === 'en') $textbox.css({direction: 'ltr'})
 
    else $textbox.css({direction: 'rtl'});

    $pageHeader = $(`<div>`, {
        class: 'pageHeader',
    })

    $pageContainer.appendTo( '#mainContainer' );
    $pageHeader.appendTo( $pageContainer );

    $backButton = $('<div/>', {
        class: 'backButton',
        click: (function(){ returnToMain() } ),
    });

    $pageTitle = $('<div/>', {
        id: title + 'PageTitle',
        class: 'pageTitle',
        lang: lang,
    })
    .html(pageArray[title + 'Page']["heading-"+lang]);


    if(lang === 'en') {
        $pageTitle.css({direction: 'ltr'})
        $backButton.css({float: 'right'})
    }

    else {
        $pageTitle.css({direction: 'rtl'})
        $backButton.css({float: 'left'});
    }

    $backButton.appendTo( $pageHeader );
    $pageTitle.appendTo( $pageHeader );

    if(pageArray[title + 'Page'].video){
        $videoFrame = $(`<div/>`, {
            class: 'aspect-ratio',
        })
        .prepend(`<iframe class="videoFrame" src="${pageArray[title + 'Page'].video}" allowfullscreen></iframe>`)
        .appendTo( $pageContainer )
    }

    $textbox.appendTo( $pageContainer );

    //if there are images to display
    if(pageArray[title + 'Page'].img){
        var imgArray = pageArray[title + 'Page'].img;

        $imageContainer = $('<div/>', {
            id: 'imageContainer',
            class: 'imageContainer-' + lang,
        });

        $imageContainer.appendTo( '#mainContainer' );   
             
        for(i=0; i<imgArray.length; i++) {
                $('<div/>', {
                    id: title + 'PageImage' + i,
                    class: 'sideImage',
                    click: (function(){ showImage(this.id, imgArray, pageArray) } ),
                })
                .prepend(`<img src= ${imgArray[i].location} style="width: 100%"/>`)
                .appendTo( $imageContainer )
        }

        if(lang === 'ar'){
            $('.sideImage').css({'margin-left': '30px'})
        }
    }
}


function showPage(pageArray, title) {

    $('.logoContainer').show();
    $('.socialContainer').show();

   //hide tree
   removeAllBranches();

   console.log('lang is', lang)

   if( !$('#mainMenuContainer').length ){
        $mainMenuContainer = $('<div/>', {
                id: "mainMenuContainer",
                class: "mainMenuContainer-" + lang,
        }).appendTo( '#mainContainer' );

        $subMenuContainer = $('<div/>', {
                id: "subMenuContainer",
                class: "subMenuContainer-" + lang,
        }).appendTo( '#mainContainer' );
    }

    var mainOffset = $("#mainMenuContainer").offset().left + 20;
    var subOffset = $("#subMenuContainer").offset().left;
    console.log('suboffset is ', $("#subMenuContainer").offset().left)
    var padding = (lang === 'en') ? 20 : -20

    for(i=0; i<menus["main"].contents.length; i++){
        var mainMenuItem = menus["main"].contents[i].replace(/\s/g, '');

        var leftIndent = (menus["main"].contents[i] === title ||
                $('#' + title).parent().attr('id').slice(0, -1) === $( '#' + mainMenuItem).parent().attr("id")) ? mainOffset + padding : mainOffset;

        (lang === 'en') ? $( '#' + mainMenuItem).animate({'left': '10px'}, 800) : $( '#' + mainMenuItem).animate({'right': '100px'}, 800)

        $( '#' + mainMenuItem).parent().animate({'left': leftIndent}, 800);
        $( '#' + mainMenuItem).animate({'top': 102 + 70*i + 'px'}, 800);
        $( '#' + mainMenuItem).parent().animate({'top': '20px'}, 800);        
    }

    //handle submenus: if you clicked from a submenu 
    parentFrame = $('#'+title).parent().attr('id').charAt(5);

    var i = 0;
    $(`*[id^=frame${parentFrame}].subframe`).each(function() {
        var topOffset = 110 + 70*parentFrame;

        var color = (this.id === $('#' + title).parent().attr('id')) ? 'yellow' : 'white';

        $div = $('#' + $(this).attr('id'))
        $div.children().attr('id')

        if(lang === 'en')
            $div.children().css({'left': '35px', 'right': ''}, 800)

        else
            $div.children().css({ 'left': '', 'right': '10px'}, 800)

        $div.animate({'left': subOffset}, 800)
        $div.animate({'top': topOffset + 50*i + 'px'}, 800)
        $div.children().css({'top': '10px'}, 800)     

        $div.css({"color": color })

        i++;   
    });   

    //else
    $(`:not(*[id^=frame${parentFrame}]).subframe`).hide()

    //remove other page divs (of class textbox?)
    // $('.textbox').remove();
    $('.pageContainer').remove();
    $('.eventPageContainer-'+lang).remove();    
    $('#imageContainer').remove();

    if(pageArray[title + 'Page'].type === 'page'){
        addTextPage(pageArray, title);
    }

    if (pageArray[title + 'Page'].type === 'eventsPage') {
        addEventsPage(title);
    }

    if (pageArray[title + 'Page'].type === 'teamPage') {
        addTeamPage(title);
    }

    if (pageArray[title + 'Page'].type === 'newsPage') {
        addNewsPage(title);
    }

    if (pageArray[title + 'Page'].type === 'residencyPage') {
        addResidencyPage(title);
    }

    if (pageArray[title + 'Page'].type === 'arenaPage') {
        addArenaPage(title);
    }

    if(window.pageMode === false){
        rotate($('#logo'), -90);
    }

    if(lang === 'ar') {   
        $(`#backButton`).css({'float': 'left'})    
    }

    window.pageMode = true;
    
}

function showFrames(root) {
    if(pageMode === false){  
        for(i=0; i<menus[root].contents.length; i++){
            var divId = menus[root].contents[i].replace(/\s/g, '');
            $('#' + divId).toggle();
        
        //now the dictionary has loaded, add the links
            if(dictionary[divId].type === "link" ) {
                $('#' + divId).unbind('click');
                $('#' + divId).click(function(){ window.location =dictionary[this.id].link });
            }
        }
        //if divs are now hidden, remove the branch
        $('#' + menus[root].contents[0].replace(/\s/g, '')).is(":hidden") ? removeBranch(root) : drawBranch(root)
    }

    else {
        toggleSideMenu(root);
    }


}

function generateMenus() {
    for (j=0; j<Object.keys(menus).length; j++){
        generateFrames(Object.keys(menus)[j]);
    }
}

function generateFrames(menu){
//class, css etc defined by type
    for(i=0; i<menus[menu].contents.length; i++){
        menu = menu.replace(/\s/g, '');

        if(menu !== "main"){
            parent = $('#' + menu).parent();
            parentNum = parseInt(parent.attr('id').slice(5));
        }

        else
            parentNum = ''

        var frameType = (menus[menu].level > 0) ? "subframe" : "frame";
        var headingType = (menus[menu].level > 0) ? "subheading" : "heading";
        var display = (menus[menu].level > 0) ? "none" : "Event";

        $frame = $('<div/>', {
            id: 'frame' + parentNum + i,
            class: frameType,
        }).appendTo( '#treeFrameContainer' );

        var top, left;
        if (menus[menu].contents[i] === 'SAKIYA'){
            top = ($(document).width()/25);
            left = 20;
        }

        else {
            top = Math.random()*50;
            left = Math.random()*50;
        }

        headingID = menus[menu].contents[i].replace(/\s/g, '');

        $heading = $('<div/>', {
            id: headingID,
            class: headingType,
            click: (function(){ showFrames(this.id) } ),
        })
        .html( menus[menu].contents[i] );

        if(menus[menu].level === 1) {
            $heading.unbind('click');
            $heading.click(function(){ showPage(dictionary, this.id) });
        }

        if(menus[menu].type === "text" ) {
            $('#' + menu).unbind('click');
            $('#' + menu).click(function(){ showPage(dictionary, this.id) });
        }

        $heading.css({
        'z-index': 3,
        'top': top+'px',
        'left': left+'px',
        'display': display,        
        }).appendTo( $frame );
    }
}


window.onload = function() {

    getDictionary.then(function(value) {
        generateMenus();
        drawBranch("main");
    })

    getEvents;
    getResidencies;
    getTeam;
    getNews;

    //get readings
    httpGetAsync("https://api.are.na/v2/channels/week-2-readings/contents"); 
}