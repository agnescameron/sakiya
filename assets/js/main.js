var gridSquares, xnum, ynum;

function generateGrid(){
    //subdivide the document into 10x10 squares to use as co-ordinate system
    squareSize = 25;

    xnum = Math.floor($(document).width()/squareSize)
    ynum = Math.floor($(document).height()/squareSize)

    console.log('xnum ', xnum, 'ynum  ', ynum)
    leftMargin = ($(document).width() - Math.floor($(document).width()/squareSize)*squareSize)/2;
    topMargin = ($(document).height() - Math.floor($(document).height()/squareSize)*squareSize)/2;

    for(j=0; j<ynum; j++){
        for(i=0; i<xnum; i++){
            $('<div/>', {
                id: i+xnum*j,
                class: "gridElement"
            }).css({
            'width': squareSize,
            'height': squareSize,
            'left':squareSize*i+leftMargin+'px',
            'top':squareSize*j+topMargin+'px',
            'position':'fixed',
            }).appendTo( 'body' );
        }
    }
    gridSquares = xnum*ynum;
}

function generateMenus() {
    for (j=0; j<Object.keys(menus).length; j++){
        generateFrames(Object.keys(menus)[j]);
    }
}


function showPage(title) {
    //put the tree to the side
    for(i=0; i<menus["main"].contents.length; i++){
        var leftIndent = (menus["main"].contents[i] === title) ? "50" : "20";

        $( '#' + menus["main"].contents[i]).animate({'left': '10px'}, 1000);
        $( '#' + menus["main"].contents[i]).parent().animate({'left': leftIndent+'px'}, 1000);
        $( '#' + menus["main"].contents[i]).animate({'top': 100 + 70*i + 'px'}, 1000);
        $( '#' + menus["main"].contents[i]).parent().animate({'top': '20px'}, 1000);        
    }
    //render a box with the information

    $('<div/>', {
        id: title,
        class: 'textbox',
    }).html(menus[title].contents)
    .appendTo( 'body' );
}

function showFrames(root) {
    console.log('show', root);
    for(i=0; i<menus[root].contents.length; i++){
        $('#' + menus[root].contents[i].replace(/\s/g, '')).toggle();
    }
}

function generateFrames(menu){
//class, css etc defined by type
    for(i=0; i<menus[menu].contents.length; i++){
        
        if(menu !== "main"){
            parent = $('#' + menu).parent();
            parentNum = parseInt(parent.attr('id').slice(-1));
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

        $('<div/>', {
            id: menus[menu].contents[i].replace(/\s/g, ''),
            class: headingType,
            click: (menus[menu].type === "menu") ? function(){ showPage(this.id) } : function(){ showFrames(this.id) }
        })
        .html( menus[menu].contents[i] )
        .css({
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