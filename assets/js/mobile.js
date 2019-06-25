function generateList(){
    var headings = ["SAKIYA", "Board", "Events", "Projects", "Curriculum", "Community"]
    for(i=0; i<headings.length; i++){
        makeDiv(headings[i], i);
  }
}

function makeDiv(name, number){
    // vary size for fun
    $newdiv = $('<div/>', {
        id: name,
        class: "heading"
    });

    $newdiv.css({
        'top': i*90 + 'px',
    }).appendTo( '#container' );
    $newdiv.html(name);
}

window.onload = function() {
    generateList();
}