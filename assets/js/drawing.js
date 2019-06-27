function drawBranch() {

}


function drawMainTree() {
	var base = $( '#SAKIYA' ).offset();
	console.log(menus["main"].contents.length);

	base.left = base.left + $( '#SAKIYA' ).width()/2;
	base.top = base.top - $( '#SAKIYA' ).height()/2;

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
		console.log(basePoint, goalPoint)
	}
}

drawMainTree();