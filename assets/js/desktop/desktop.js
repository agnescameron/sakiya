window.pageMode = false;

var fields = 7;

async function returnToMain () {
    $('.pageContainer').remove();
    $('.imageContainer').remove();
    $('.eventPageContainer').remove();

    var styleSheet;
    for (var i = 0; i < document.styleSheets.length; i++){
        var sheet = document.styleSheets[i]
        //need to find a good way to ref this for online 
        if(sheet.href.includes("frames.css"))
            styleSheet = sheet;
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

function toggleSideMenu(title) {

    $('.pageContainer').remove();
    $('.eventPageContainer').remove();

    parentFrame = $('#'+title).parent().attr('id').charAt(5);

    for(i=0; i<menus["main"].contents.length; i++){
    var mainMenuItem = menus["main"].contents[i].replace(/\s/g, '');
        //change for ar vs en
    console.log('toggling side menu')

    var leftIndent;

    if(lang === 'ar'){
        leftIndent = (mainMenuItem === title) ? "58vw" : "60vw";
    }
    else {
        leftIndent = (mainMenuItem === title) ? "50px" : "20px";
    }
    var color = (mainMenuItem === title) ? 'yellow' : 'white';

        $( '#' + mainMenuItem).parent().animate({'left': leftIndent}, 500);  
        $( '#' + mainMenuItem).css({"color": color })  
    }

    var i = 0;
    $(`*[id^=frame${parentFrame}].subframe`).each(function() {
        var color = (this.id === $('#' + title).parent().attr('id')) ? 'yellow' : 'white';

        var topOffset = 110 + 70*parentFrame;
        $div = $('#' + $(this).attr('id'))
        $div.children().attr('id')

        var leftIndent = (lang === 'ar') ? "50vw" : '180px';
        $div.css({'left': leftIndent})
        $div.children().css({'left': '35px'})
        $div.css({'top': topOffset + 50*i + 'px'})
        $div.children().css({'top': '10px'})     

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
    var containerWidth = $('.eventPageContainer').width();
    numContainers = Math.floor(containerWidth/276);
    console.log('number of containers is', numContainers)

    eventWidth = numContainers*276 - 26; //-20 + 6*(numContainers-1);

    $('#'+title).addClass('eventPage').removeClass('eventBox')
    .unbind("click")
    .animate({
        'height': '400px',
        'width': eventWidth})

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
        lang: lang,
    }).html(eventContents)
    .appendTo( $('#'+title) )

    if( lang === 'ar'){
        console.log('floating')
        $(`.eventBackButton`).css({'float': 'left'})  
        $('#'+title+'Contents').css({direction: 'rtl'}).attr({lang: 'ar'})
    }

}

async function closeEvent(title) {

    $('eventPageDate').addClass('eventBoxDate').removeClass('eventPageDate')

    $('#'+title).addClass('eventBox').removeClass('eventPage')
    .animate({
        'height': '250px',
        'width': '250px'});

    $('#' + title + 'Back').remove();

    $('.eventText').remove();
    //$('#'+title+'Contents').remove();

    await sleep(100);
    $('#'+title).click(function(){ openEvent(title) } )
}

function addResidencyPage(title) {
    console.log('group is', title)
    var residencies = getEntries(residenciesData, "group", title);

    console.log('residencies are ', residencies)

    $pageContainer = $('<div/>', {
        id: title + 'PageContainer',
        class: 'eventPageContainer',
    });

    $imageContainer = $('<div/>', {
        id: title + 'ImageContainer',
        class: 'imageContainer',
    });

    for (i=0; i<Object.keys(residencies).length; i++){
        var key = Object.keys(residencies)[i].slice(0, -4);
        var residencyTitle = (lang === 'en') ? residencies[key+'Page']["heading-en"] : residencies[key+'Page']["heading-ar"];
        var image = residencies[key+'Page'].img[0].location;


        $residentBox = $('<div/>', {
            id: key,
            class: 'eventBox',
            click: (function(){ $('.eventPageContainer').remove(); addTextPage(residencies, this.id); } ),
        })
        .css({'background-image': `url(${image})`, 'background-size': 'cover'})
        .appendTo($pageContainer);
    
        $('<div/>', {
            id: key+'PageTitle',
            class: 'eventBoxTitle',
        }).html(residencyTitle)
        .appendTo( $residentBox );

        $pageContainer.appendTo( 'body' );

        if(lang === 'ar') {
            $('#'+key+'Title').css({direction: 'rtl'}).attr({lang: 'ar'})
            $('#'+key+'Date').css({direction: 'rtl'}).attr({lang: 'ar'})
        }

    }

    if (Object.keys(residencies).length === 0){

        var noResidents = (lang === 'ar') ?  `سامية حلبيسامية حلبيسامية حلبي` : `There are no artists currently in residence at Sakiya. If you are interested 
        in our open calls, please see here, or contact Sahar Qawasmi`

        var direction = (lang === 'ar') ? 'rtl' : 'ltr' 

        $('<p/>', {
            id: 'noResidents',
            lang: lang
        })
        .css({'padding': '10px', 'direction': direction})
        .html(noResidents)
        .appendTo($pageContainer);

        $pageContainer.appendTo( 'body' );
    }

    $imageContainer.appendTo( 'body' ); 

}


function addEventsPage(title) {
    var events = getEntries(eventsData, "type", title);

    $pageContainer = $('<div/>', {
        id: title + 'PageContainer',
        class: 'eventPageContainer',
    });

    $imageContainer = $('<div/>', {
        id: title + 'ImageContainer',
        class: 'imageContainer',
    });

    for (i=0; i<Object.keys(events).length; i++){
        var key = Object.keys(events)[i];
        var eventDate = new Date(events[key]["date"]);
        var eventTitle = (lang === 'en') ? events[key]["heading-en"] : events[key]["heading-ar"];
        var randImage = illustrationArray[ i ];

        $eventBox = $('<div/>', {
            id: key,
            class: 'eventBox',
            click: (function(){ openEvent(this.id) } ),
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
    
        $('<div/>', {
            id: title + 'Poster',
            class: 'sideImage',
            click: (function(){ showImage(this.id) } ),
        })
        .prepend(`<img src= ${events[key].poster} style="width: 100%"/>`)
        .appendTo( $imageContainer )

        $pageContainer.appendTo( 'body' );

        if(lang === 'ar') {
            $('#'+key+'Title').css({direction: 'rtl'}).attr({lang: 'ar'})
            $('#'+key+'Date').css({direction: 'rtl'}).attr({lang: 'ar'})
        }

    }



    $imageContainer.appendTo( 'body' ); 

}

function addTextPage(pageArray, title) {
    $pageContainer = $('<div/>', {
        id: title + 'PageContainer',
        class: 'pageContainer',
    });

    $textbox = $('<p/>', {
        id: title + 'Page',
        class: 'textbox',
    });

    if(lang === 'en'){
        $textbox.html(pageArray[title + 'Page']['contents-en'])
            .attr({lang: 'en'})
            .css({direction: 'ltr'})
    }

    else{
        $textbox.html(pageArray[title + 'Page']['contents-ar'])
            .attr({lang: 'ar'})
            .css({direction: 'rtl'})
    }

    $pageContainer.appendTo( 'body' );
    $textbox.appendTo( $pageContainer );
    $('<div/>', {
        id: 'backButton',
        click: (function(){ returnToMain() } ),
    }).appendTo( $pageContainer );

    //if there are images to display
    if(pageArray[title + 'Page'].img){
        $imageContainer = $('<div/>', {
            id: title + 'ImageContainer',
            class: 'imageContainer',
        });

        $imageContainer.appendTo( 'body' );   
             
        for(i=0; i<pageArray[title + 'Page'].img.length; i++) {
                $('<div/>', {
                    id: title + 'PageImage' + i,
                    class: 'sideImage',
                    click: (function(){ showImage(this.id) } ),
                })
                .prepend(`<img src= ${pageArray[title + 'Page'].img[i].location} style="width: 100%"/>`)
                .appendTo( $imageContainer )
        }
    }
}


function showPage(pageArray, title) {
   //put the tree to the side

   //hide tree
   removeAllBranches();


    for(i=0; i<menus["main"].contents.length; i++){
        var mainMenuItem = menus["main"].contents[i].replace(/\s/g, '');
        
        if(lang === 'en'){
            var leftIndent = (menus["main"].contents[i] === title ||
                $('#' + title).parent().attr('id').slice(0, -1) === $( '#' + mainMenuItem).parent().attr("id")) ? "50px" : "20px";
            }

        else {
            var leftIndent = (menus["main"].contents[i] === title ||
                $('#' + title).parent().attr('id').slice(0, -1) === $( '#' + mainMenuItem).parent().attr("id")) ? "58vw" : "60vw";
    }

        $( '#' + mainMenuItem).animate({'left': '10px'}, 800);
        $( '#' + mainMenuItem).parent().animate({'left': leftIndent}, 800);
        $( '#' + mainMenuItem).animate({'top': 100 + 70*i + 'px'}, 800);
        $( '#' + mainMenuItem).parent().animate({'top': '20px'}, 800);        
    }

    //handle submenus: if you clicked from a submenu 
    parentFrame = $('#'+title).parent().attr('id').charAt(5);

    var i = 0;
    $(`*[id^=frame${parentFrame}].subframe`).each(function() {
        var topOffset = 110 + 70*parentFrame;

        var color = (this.id === $('#' + title).parent().attr('id')) ? 'yellow' : 'white';
        var leftIndent = (lang === 'en') ? '180px' : '50vw';


        $div = $('#' + $(this).attr('id'))
        $div.children().attr('id')

        $div.animate({'left': leftIndent}, 800)
        $div.children().animate({'left': '35px'}, 800)
        $div.animate({'top': topOffset + 50*i + 'px'}, 800)
        $div.children().animate({'top': '10px'}, 800)     

        $div.css({"color": color })

        i++;   
    });   

    //else
    $(`:not(*[id^=frame${parentFrame}]).subframe`).hide()

    //remove other page divs (of class textbox?)
    // $('.textbox').remove();
    $('.pageContainer').remove();
    $('.imageContainer').remove();
    $('.eventPageContainer').remove();

    console.log('pageArray is ', pageArray, 'title is', title)

    if(pageArray[title + 'Page'].type === 'page'){
        addTextPage(pageArray, title);
    }

    if (pageArray[title + 'Page'].type === 'eventsPage') {
        addEventsPage(title);
    }

    if (pageArray[title + 'Page'].type === 'residencyPage') {
        addResidencyPage(title);
    }


    if(window.pageMode === false){
        rotate($('#logo'), -90);
    }

    if(lang === 'ar') {   
        $(`.pageContainer`).css({'left': '0px', 'z-index': '0'})
        $(`.eventPageContainer`).css({'z-index': '0', 'left': '60px',})
        $(`.textbox`).css({'float': 'right', 'right': '80px'})
        $(`#backButton`).css({'left': '10%', 'float': 'left'})    
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
    // generateGrid();

    getDictionary.then(function(value) {
        generateMenus();
        drawBranch("main");
    })

    getEvents;
    getResidencies;
}