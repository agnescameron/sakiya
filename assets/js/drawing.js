function drawBranch() {

}


function drawMainTree() {
	var base = $( '#SAKIYA' ).offset();
	console.log($( '#SAKIYA' ).offset());
	// offset outputs e.g. { top: 451.20001220703125, left: 632 }
	base.left = base.left + $( '#SAKIYA' ).width()/2;
	base.top = base.top - $( '#SAKIYA' ).height()/2;
	// repositions base.left and base.top to the center of "$SAKIYA"
	var basePoint = new Point(base.left, base.top)
	
	
	for(i=0; i<menus["main"].contents.length; i++){
		var branch = new Path();
		branch.strokeColor = 'black';
		var goalDiv = menus["main"].contents[i];

		var goal = $('#' + goalDiv).offset();
		goal.left =	goal.left + $( '#' + goalDiv ).width()/2;
		goal.top =	goal.top + $( '#' + goalDiv ).height()/2;

		var goalPoint = new Point(goal.left, goal.top)

		branch.moveTo(basePoint)
		branch.lineTo(goalPoint);
		// console.log(basePoint, goalPoint)
	}
}

drawMainTree();