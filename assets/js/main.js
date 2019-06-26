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
    for(i=0; i<menus[menu].contents.length; i++){
        $frame = $('<div/>', {
            id: 'frame' + i,
            class: "frame"
        }).appendTo( 'body' );

        var top, left;
        if (menus[menu].contents[i] === 'SAKIYA'){
            top = ($(document).width()/25);
            left = 20;
        }

        else {
            top = Math.random()*100;
            left = Math.random()*100;
        }

        $('<div/>', {
            id: menus[menu].contents[i],
            class: "heading"
        })
        .html( menus[menu].contents[i] )
        .css({
        'top': top+'px',
        'left': left+'px',        
        }).appendTo( $frame );
    }
}


window.onload = function() {
    generateFrames("main");
    generateGrid();
}