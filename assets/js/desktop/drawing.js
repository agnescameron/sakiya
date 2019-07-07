window.drawTree = drawTree;
var group = new Group();

function drawTree() {
	group.removeChildren();
	for (j=0; j<Object.keys(menus).length; j++){
        drawBranch(Object.keys(menus)[j]);
    }
}

function drawBranch(menu) {

	$baseDiv = (menus[menu].contents[0] === "SAKIYA") ? $( '#SAKIYA' ) : $('#' + menu)
	
	var base = $baseDiv.offset();

	base.left = base.left + $baseDiv.width()/2;
	base.top = base.top - $baseDiv.height()/2;

	// repositions base.left and base.top to the center of "$SAKIYA"
	var basePoint = new Point(base.left, base.top)
	
	//need to draw to parents not children
	for(i=0; i<menus[menu].contents.length; i++){
		if(menus[menu].contents[i] !== ''){
			var branch = new Path();
			branch.strokeColor = 'black';
			goalDiv = menus[menu].contents[i].replace(/\s/g, '');

			var wasHidden = false;
			if ($('#' + goalDiv).is(':hidden')){
				$('#' + goalDiv).toggle();
				wasHidden = true;
			}
			var goal = $('#' + goalDiv).offset();
			goal.left =	goal.left + $( '#' + goalDiv ).width()/2;
			goal.top =	goal.top + $( '#' + goalDiv ).height()/2;

			var goalPoint = new Point(goal.left, goal.top)

			branch.moveTo(basePoint)
			branch.lineTo(goalPoint);

			group.addChild(branch)

			if(wasHidden===true) $('#' + goalDiv).css({'display': 'none'})
		}
	}
}

drawTree();