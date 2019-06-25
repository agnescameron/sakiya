var gridSquares, xnum, ynum;

function generateGrid(){
    //subdivide the document into 10x10 squares to use as co-ordinate system
    squareSize = 150;

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

function generateMap(){
    var headings = ["SAKIYA", "Board", "Events", "Projects", "Curriculum", "Community"]
    var filledBoxes = [];
    for(i=0; i<headings.length; i++){
        makeDiv(headings[i], filledBoxes);
  }
}

function makeDiv(name, filledBoxes){
    // vary size for fun
    $newdiv = $('<div/>', {
        id: name,
        class: "heading"
    })

    var gridBox, top;

    if(name === "SAKIYA"){
        gridx = Math.floor(xnum/2);
        gridy = Math.ceil(ynum/2);
        gridBox = gridx + xnum*gridy;
        titleLine = xnum*gridy;
        top = 0;
    }

    else{
        var chosen = false; 
        while(chosen === false){
            // make position sensitive to size and document's width
            gridBox = Math.floor(Math.random()*xnum*ynum);
            
            var intersection = false;
            console.log(filledBoxes)
            for(i=0; i<filledBoxes.length; i++){
                if (gridBox === filledBoxes[i])
                    intersection = true;
            }

            if(gridBox < titleLine && intersection === false)
                chosen = true;
        }
        top = Math.random()*100;
    }

    $newdiv.css({
        'top': top+'px',
        // 'display':'none'
    }).appendTo( '#'+gridBox );

    filledBoxes.push(gridBox);
    $newdiv.html(name);
}

window.onload = function() {
    generateGrid();
    generateMap();
}