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

function newBranch(root) {

    parent = $('#' + root).parent();
    parentNum = parseInt(parent.attr('id').slice(-1));
    console.log(parent);

    //how many?
    numBranches = menus[root].contents.length;

    //mark out a space and divide between them
    var leftOffset, topOffset;

    //sort out left offset first
    if(parentNum < 4 && parentNum !== 0){
        leftOffset = -50;
    }

    //then top offset
    else if(parentNum > 3 && parentNum !== 0){
        leftOffset = 50 + $('#' + root).width();
    }

    else leftOffset = 0;

    //now deal with the top offset
    if(parentNum === 3 || parentNum === 4){
        topOffset = -50;
    }

    else if(parentNum === 1 || parentNum === 6){
        topOffset = -25;
    }

    else if(parentNum === 0){
        topOffset = 50 + $('#' + root).height();
    }

    for(i=0; i<numBranches; i++){
        $('<div/>', {
            id: menus[root].contents[i],
            class: "subheading",
            click: function(){ console.log("wwwww") }
        })
        .html( menus[root].contents[i] )
        .css({
        'z-index': 3,
        'top': topOffset+(i*100)+'px',
        'left': leftOffset+(i*100)+'px',        
        }).appendTo( $('#' + root) );
    }

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
            class: "heading",
            click: function(){ newBranch(this.id) }
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