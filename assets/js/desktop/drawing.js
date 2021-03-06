window.drawTree = drawTree;
window.drawBranch = drawBranch;
window.removeBranch = removeBranch;
window.removeAllBranches = removeAllBranches;

var mainGroup = new Group();

function drawTree() {
	if(pageMode === false){
		mainGroup.removeChildren();
		for (j=0; j<Object.keys(menus).length; j++){
	        drawBranch(Object.keys(menus)[j]);
    	}
    }
}

function removeBranch(menu) {
	if(pageMode === false)
		mainGroup.children[menu + 'Branch'].remove();
}

function removeAllBranches() {
	if(pageMode === false)
		mainGroup.removeChildren();
}

function drawBranch(menu) {

	$baseDiv = (menus[menu].contents[0] === "SAKIYA") ? $( '#SAKIYA' ) : $('#' + menu)
	
	var subGroup = new Group({ name: menu+'Branch'});

	var base = $baseDiv.offset();

	base.left = base.left + $baseDiv.width()/2;
	base.top = base.top - 90;

	// repositions base.left and base.top to the center of "$SAKIYA"
	var basePoint = new Point(base.left, base.top)
	
	//need to draw to parents not children
	for(i=0; i<menus[menu].contents.length; i++){
		if(menus[menu].contents[i] !== ''){
			var branch = new Path();
			branch.strokeColor = 'black';
			goalDiv = menus[menu].contents[i].replace(/\s/g, '');

			
			if ($('#' + goalDiv).is(':visible')){
				var goal = $('#' + goalDiv).offset();
				goal.left =	goal.left + $( '#' + goalDiv ).width()/2;
				goal.top =	goal.top - 90;

				var goalPoint = new Point(goal.left, goal.top)

				branch.moveTo(basePoint)
				branch.lineTo(goalPoint);

				subGroup.addChild(branch);	
				mainGroup.addChild(subGroup);
			}
		}
	}
}

window.onresize = function(){drawTree()}