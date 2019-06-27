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
    console.log(gridSquares);
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

        console.log("menu level is", menus[menu].level)

        var frameType = (menus[menu].level > 0) ? "subframe" : "frame";
        var headingType = (menus[menu].level > 0) ? "subheading" : "heading";

        $frame = $('<div/>', {
            id: 'frame' + parentNum + i,
            class: frameType,
        }).appendTo( 'body' );

        console.log('new frame id is', 'frame' + parentNum + i, " parentnum is ", parentNum)

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
            id: menus[menu].contents[i],
            class: headingType,
            click: function(){ generateFrames(this.id), i }
        })
        .html( menus[menu].contents[i] )
        .css({
        'z-index': 3,
        'top': top+'px',
        'left': left+'px',        
        }).appendTo( $frame );
    }
}


window.onload = function() {
    generateFrames("main");
    // generateGrid();
}