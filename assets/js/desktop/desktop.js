window.pageMode = false;

function toggleSideMenu(title) {
    parentFrame = $('#'+title).parent().attr('id').charAt(5);
    
    for(i=0; i<menus["main"].contents.length; i++){
    var leftIndent = (menus["main"].contents[i] === title) ? "50" : "20";
    var color = (menus["main"].contents[i] === title) ? 'yellow' : 'white';

        $( '#' + menus["main"].contents[i]).parent().animate({'left': leftIndent+'px'}, 600);  
        $( '#' + menus["main"].contents[i]).css({"color": color })  
    }

    var i = 0;
    $(`*[id^=frame${parentFrame}].subframe`).each(function() {
        var color = (this.id === $('#' + title).parent().attr('id')) ? 'yellow' : 'white';

        var topOffset = 110 + 70*parentFrame;
        $div = $('#' + $(this).attr('id'))
        $div.children().attr('id')

        $div.css({'left': '180px'})
        $div.children().css({'left': '20px'})
        $div.css({'top': topOffset + 50*i + 'px'})
        $div.children().css({'top': '10px'})     

        $div.show()
        $div.children().show()
        $('#' + title).css({"color": color})

        i++;
    });   

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

function showPage(title) {
   //put the tree to the side
    for(i=0; i<menus["main"].contents.length; i++){
        var leftIndent = (menus["main"].contents[i] === title ||
            $('#' + title).parent().attr('id').slice(0, -1) === $( '#' + menus["main"].contents[i]).parent().attr("id")) ? "50" : "20";

        $( '#' + menus["main"].contents[i]).animate({'left': '10px'}, 800);
        $( '#' + menus["main"].contents[i]).parent().animate({'left': leftIndent+'px'}, 800);
        $( '#' + menus["main"].contents[i]).animate({'top': 100 + 70*i + 'px'}, 800);
        $( '#' + menus["main"].contents[i]).parent().animate({'top': '20px'}, 800);        
    }

    //handle submenus: if you clicked from a submenu 
    parentFrame = $('#'+title).parent().attr('id').charAt(5);

    var i = 0;
    $(`*[id^=frame${parentFrame}].subframe`).each(function() {
        var topOffset = 110 + 70*parentFrame;

        var color = (this.id === $('#' + title).parent().attr('id')) ? 'yellow' : 'white';

        $div = $('#' + $(this).attr('id'))
        $div.children().attr('id')

        $div.animate({'left': '180px'}, 800)
        $div.children().animate({'left': '20px'}, 800)
        $div.animate({'top': topOffset + 50*i + 'px'}, 800)
        $div.children().animate({'top': '10px'}, 800)     

        $div.css({"color": color })

        i++;   
    });   

    //else
    $(`:not(*[id^=frame${parentFrame}]).subframe`).hide()

    //remove other page divs (of class textbox?)
    $('.textbox').remove();

    $pageDiv = $('<div/>', {
        id: title + 'Page',
        class: 'textbox',
    });

    if(lang === 'en'){
        $pageDiv.html(dictionary[title + 'Page'].en.contents)
            .css({direction: 'ltr'})
    }

    else{
        $pageDiv.html(dictionary[title + 'Page'].ar.contents)
            .css({direction: 'rtl'})
    }

    $pageDiv.appendTo( 'body' );
    
    if(window.pageMode === false){
        $('#logo').animate({"width": "15vw", "height": "15vw"});   
        rotate($('#logo'), -90);
    }

    window.pageMode = true;
    
}

function showFrames(root) {
    if(pageMode === false){
        for(i=0; i<menus[root].contents.length; i++){

            $('#' + menus[root].contents[i].replace(/\s/g, '')).toggle();
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
        
        if(menu !== "main"){
            parent = $('#' + menu).parent();
            parentNum = parseInt(parent.attr('id').slice(5));
        }

        else
            parentNum = ''

        var frameType = (menus[menu].level > 0) ? "subframe" : "frame";
        var headingType = (menus[menu].level > 0) ? "subheading" : "heading";
        var display = (menus[menu].level > 0) ? "none" : "block";

        $frame = $('<div/>', {
            id: 'frame' + parentNum + i,
            class: frameType,
        }).appendTo( 'body' );

        var top, left;
        if (menus[menu].contents[i] === 'SAKIYA'){
            top = ($(document).width()/25);
            left = 20;
        }

        else {
            top = Math.random()*50;
            left = Math.random()*50;
        }

        $heading = $('<div/>', {
            id: menus[menu].contents[i].replace(/\s/g, ''),
            class: headingType,
            click: (function(){ showFrames(this.id) } ),
        })
        .html( menus[menu].contents[i] );

        if(menus[menu].level === 1) {
            $heading.unbind('click');
            $heading.click(function(){ showPage(this.id) });
        }

        if(menus[menu].contents.length === 1 ) {
            $('#' + menu).unbind('click');
            $('#' + menu).click(function(){ showPage(this.id) });
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
    generateMenus();
    // generateGrid();
}