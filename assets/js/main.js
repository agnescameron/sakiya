var headings = ["SAKIYA", "Board", "Events", "Projects", "Curriculum", "Community"]

function makeDiv(name){
    // vary size for fun
    $newdiv = $('<div/>', {
        id: name,
        class: "heading"
    })

    var posx, posy;

    if(name === "SAKIYA"){
        posx = ($(document).width()-100)/2;
        posy = ($(document).height()+150)/2;
    }

    else{
        var chosen = false    
        while(chosen === false){
            // make position sensitive to size and document's width
            posx = (Math.random() * ($(document).width() - 100)).toFixed();
            posy = (Math.random() * ($(document).height() - 50)).toFixed();

            //in the forbidden zone?
            if(posx < $(document).width()/2 - 100 && posx > $(document).width()/2 + 100)
                chosen = true
            
            if(posy < $(document).height()/2)
                chosen = true
        }
    }

    $newdiv.css({
        'left':posx+'px',
        'top':posy+'px',
        // 'display':'none'
    }).appendTo( 'body' );

    $newdiv.html(name);
}

window.onload = function() {
  for(i=0; i<headings.length; i++){
    makeDiv(headings[i]);
  }
}