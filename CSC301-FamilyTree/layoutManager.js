/**
 * Layout manager global variables.
 */
var MARRIAGE_DISTANCE = 2;
var LEFT = 0 - MARRIAGE_DISTANCE;
var RIGHT = MARRIAGE_DISTANCE;
var LEVEL_DISTANCE = 2;
var MINIMUM_SIBLING_DISTANCE = 4;

/**
 * Layout manager used to layout family tree members on in a grid.
 */
LayoutManager = function(familyTree) {
	this.familyTree = familyTree;
};

LayoutManager.prototype = {
	/**
	 * Family tree to layout.
	 */
	familyTree : null,
	
	/**
	 * Grid to layout the family tree on.
	 */
	grid : null,
	
	/**
	 * Layout the family tree on the grid starting with the root family member. 
	 * @param rootFamilyMemberId - id of a root family member.
	 * @return a grid with descendants of the root.
	 */
	getGrid : function( rootFamilyMemberId ) {
	
		// Find root member in the family tree and send the visitor to get all the descendants.
		var rootMember = this.familyTree.familyMembers[ rootFamilyMemberId ];
		var visitor = new LayoutFamilyMemberVisitor(this.familyTree);
		
		// If there is such member then layout his or her marriages and descendants on the grid.
		if( rootMember != null ) {
			rootMember.acceptVisitor( visitor );
		}
		
		return visitor.grid;
	}
};

/**
 * Abstract family member visitor class. It provides an interface for visitors that traverse family trees.
 * 
 * So for example to layout a family tree we can implement a visitor that traverses the nodes and plces them on a grid.
 * Additionally different visiting strategies can be implemented using different visitors.
 */
FamilyMemberVisitor = function() {
		
};

FamilyMemberVisitor.prototype = {
	visitFamilyMember : function( familyMember ) {
		throw NOT_IMPLEMENTED_EXCEPTION;
	},
	
	visitSpouse : function( spouse ) {
		throw NOT_IMPLEMENTED_EXCEPTION;
	},
	
	visitParent : function( parent ) {
		throw NOT_IMPLEMENTED_EXCEPTION;
	},
	
	visitChild : function( child ) {
		throw NOT_IMPLEMENTED_EXCEPTION;
	}
};

/**
 * A concrete visitor used to layout nodes. This is a simple implementation. Although the main concept is a visitor, they are also implemented as strategies so that
 * different implementations can use different approaches to layout family trees.
 * 
 * Uses chain of responsibility to let visitor visit each decorator. 
 * 
 * Only display up to two marriages with the current marriage (if any) always included.
 * 
 * Only follow descendants of the root. If a descendant has a marriage relationship it will be included, but any other relationships or children from previous marriages
 * for descendant's spouse will not be included. 
 */
LayoutFamilyMemberVisitor = function(tree) {
	
	// Initialize the grid and the level.
	// Grid holds the members and relationships between them.
	this.grid = {};
	this.grid.fmembers = [];
	this.grid.line = [];
	this.grid.doubleLine = [];
	this.grid.dottedLine = [];
	this.grid.doubleLine = [];
	this.grid.doubleDottedLine = [];
	this.grid.tripleLine = [];
	this.grid.tripleDottedLine = [];
	
	// Keep track of current level.
	this.level = 0;
	
	//Set current tree
	this.tree = tree;
	
	// Start at top middle. This is where we predict we'll put the root.
	this.currentX = GRID_SIZE / 2;
	
	// An associative array which keeps track of marriages picked for different family members.
	this.pickedMarriages = [];
};

LayoutFamilyMemberVisitor.prototype = new FamilyMemberVisitor();
LayoutFamilyMemberVisitor.prototype.visitFamilyMember = function( familyMember ) {
	// We are down to a family member which is a leaf so just signal to the manager that we can draw this member.
	this.grid.fmembers.push([familyMember, this.currentX, this.level]);
};
	
LayoutFamilyMemberVisitor.prototype.visitSpouse = function( spouse ) {
	var selectMarriages = this.pickedMarriages[ spouse.getId()];
	
	// We don't have stored marriages so look them up.
	if( selectMarriages == null ) {
		this.findMarriages( spouse );
		selectMarriages = this.pickedMarriages[ spouse.getId()];
	}
	
	// For a spouse first make sure we layout the actual person and then any spouses. Pass the visitor down the chain of responsibility.
	spouse.familyMember.acceptVisitor( this );
	
	if( selectMarriages.length > 0 ) {
		this.grid.fmembers.push([this.tree.familyMembers[this.findOtherSpouse(spouse,
		selectMarriages[0]).getId()], this.currentX - MARRIAGE_DISTANCE, this.level]);
		
		// Put in marriage lines.
		this.putMarriageLine( selectMarriages[0], LEFT );
	}
	
	
	if( selectMarriages.length > 1 ) {
		// Adjust x for other marriages.
		this.grid.fmembers.push([this.tree.familyMembers[this.findOtherSpouse(spouse,
		selectMarriages[1]).getId()], this.currentX + MARRIAGE_DISTANCE, this.level]);
		
		//Have to put in a fix for divorces. Divorces is set to true for the spouse that
		//ISNT divorced
		for (var i=0;i<spouse.marriages.length;i++) {
		
		if (spouse.marriages[i].status == "married") {
		
		if (spouse.getGender() == "MALE") {
		spouse.marriages[i].wife.familyMember.setDivorce();	
		} else {
		spouse.marriages[i].husband.familyMember.setDivorce();	
		}
		
		}
		
		}
		
		// Put in marriage lines.
		this.currentX -= MARRIAGE_DISTANCE;
		this.putMarriageLine( selectMarriages[1], RIGHT );
		this.currentX += MARRIAGE_DISTANCE;
	}
	
	
};

/**
 * A simple utility function to pick up to two marriages for a spouse. This will always include the current marriage if any.
 * 
 * @param spouse - a spouse whose marriages we'll check.
 * @return a list containing two marriages.
 */
LayoutFamilyMemberVisitor.prototype.pickTwoMarriages = function( spouse ) {
	// Select up to two marriages to display. Current marriages and common law have higher priority.
	// First handle current marriage if any. Place the marriage on the left.
	var numberOfMarriages = 0;
	var pickTwoMarriages = [];
	
	if( spouse.current != null ) {
		pickTwoMarriages[numberOfMarriages] = spouse.current;
		numberOfMarriages++;
	}
	
	for( var i = 0; i < spouse.marriages.length; i++ ){
		// If it's not a current marriage that we already processed then process it.
		if( spouse.marriages[i] != spouse.current ) {
			pickTwoMarriages[numberOfMarriages] = spouse.marriages[i];
			numberOfMarriages++;
				
			if( numberOfMarriages == 2 ) {
				// Done.
				break;
			}
		}
	}
	
	return pickTwoMarriages;
	
};

/**
 * A simple utility function to find the other spouse in a marriage.
 */
LayoutFamilyMemberVisitor.prototype.findOtherSpouse = function( spouse, marriage ) {
	if( spouse == marriage.wife ) {
		return marriage.husband;
	} else {
		return marriage.wife;
	}
};

/**
 * Get marriage lines list based on marriage status.
 * TODO Implement this method. Right now it places only solid lines.
 */
LayoutFamilyMemberVisitor.prototype.putMarriageLine = function( marriage, xDistance ){
	switch( marriage.status ) {
		case MARRIED_STATUS:
			this.grid.doubleLine.push([this.currentX, this.level, this.currentX + xDistance, this.level]);
			break;
		case COMMONLAW_STATUS:
			this.grid.tripleDottedLine.push([this.currentX, this.level, this.currentX + xDistance, this.level]);
			break;
		case DIVORCED_STATUS:
			this.grid.doubleDottedLine.push([this.currentX, this.level, this.currentX + xDistance, this.level]);
			break;
			
		// Other known and unknown cases.
		case WIDOWED_STATUS:
		case SEPARATED_STATUS:
		default:
			this.grid.line.push([this.currentX, this.level, this.currentX + xDistance, this.level]);
			break;
	};
};
	
LayoutFamilyMemberVisitor.prototype.visitParent = function( parent ) {
	
	//Which marriages did we pick for this parent?
	var currentPickedMarriages = this.pickedMarriages[parent.getId()];

	// We don't have stored marriages so look them up.
	if( currentPickedMarriages == null ) {
		this.findMarriages( parent );
		currentPickedMarriages = this.pickedMarriages[ parent.getId()];
	}
	
	var firstMarriageKids = [];
	var secondMarriageKids = [];
	
	if( currentPickedMarriages != null && currentPickedMarriages.length > 0 ) {
		// Make sure all the kids are placed on the grid first before we handle this parent.
		// Increase the level.
		this.level += LEVEL_DISTANCE;
		
		for( var i = 0; i < parent.children.length; i++ ){
			
			var child = parent.children[i];
			
			// Consider only children for the displayed marriages.
			if( child.mother.getId() == currentPickedMarriages[0].wife.getId() && child.father.getId() == currentPickedMarriages[0].husband.getId() ) {
				firstMarriageKids.push( child );
			}
			
			if( currentPickedMarriages.length > 1 && child.mother.getId() == currentPickedMarriages[1].wife.getId() && child.father.getId() == currentPickedMarriages[1].husband.getId() ) {
				secondMarriageKids.push( child );
			}
		}
		
		var keepX = this.currentX;
		
		if( firstMarriageKids.length > 0 ) {
			// Process first marriage kids.
			// Place a connector for kids.
			this.grid.line.push([this.currentX + LEFT / 2, this.level - LEVEL_DISTANCE / 2, this.currentX  + LEFT / 2, this.level - LEVEL_DISTANCE]);
			
			// Adjust the current x to layout the children.
			this.currentX = keepX + LEFT * firstMarriageKids.length / 2;
			var firstChildX = this.currentX;
			var lastChildX = this.currentX;
			
			for( var i = 0; i < firstMarriageKids.length; i++ ) {
				this.tree.familyMembers[firstMarriageKids[i].getId()].acceptVisitor( this );
				
				if( firstMarriageKids[i].isAdopted ) {
					this.grid.dottedLine.push([this.currentX, this.level - LEVEL_DISTANCE / 2, this.currentX, this.level]);
				} else {
					this.grid.line.push([this.currentX, this.level - LEVEL_DISTANCE/2, this.currentX, this.level]);
				}
				
				
				lastChildX = this.currentX 
				this.currentX += MINIMUM_SIBLING_DISTANCE;
			}
			
			this.grid.line.push([firstChildX, this.level - LEVEL_DISTANCE / 2, lastChildX, this.level - LEVEL_DISTANCE / 2]);
		}
		
		if( secondMarriageKids.length > 0 ) {
			
			// Place a connector for kids.
			this.grid.line.push([this.currentX + RIGHT / 2, this.level - LEVEL_DISTANCE / 2, this.currentX  + RIGHT / 2, this.level - LEVEL_DISTANCE]);
			
			// Process second marriage kids.
			this.currentX = keepX + LEFT * secondMarriageKids.length / 2;
			var firstChildX = this.currentX;
			var lastChildX = this.currentX;
			
			for( var i = 0; i < secondMarriageKids.length; i++ ) {
				this.tree.familyMembers[secondMarriageKids[i].getId()].acceptVisitor( this );
				
				if( secondMarriageKids[i].isAdopted ) {
					this.grid.dottedLine.push([this.currentX, this.level - LEVEL_DISTANCE / 2, this.currentX, this.level]);
				} else {
					this.grid.line.push([this.currentX, this.level - LEVEL_DISTANCE / 2, this.currentX, this.level]);
				}
				
				lastChildX = this.currentX 
				this.currentX += MINIMUM_SIBLING_DISTANCE;
			}
			
			this.grid.line.push([firstChildX, this.level - LEVEL_DISTANCE / 2, lastChildX, this.level - LEVEL_DISTANCE / 2]);
		}
		
		// Done with children. Back at the level.
		this.level -= LEVEL_DISTANCE;
		this.currentX = keepX;
	}
	
	// Pass the visitor down the chain of responsibility.
	parent.familyMember.acceptVisitor( this );
};

/**
 * A utility function that goes down the chain of decorators to see if there are any marriages for this familyMember and if it finds any stores them in a select marriages list.
 * @param familyMember - familyMember to check
 */
LayoutFamilyMemberVisitor.prototype.findMarriages = function( member ) {
	
	while( member != null ) {
		
		if( member.marriages != null ) {
			this.pickedMarriages[ member.getId()] = this.pickTwoMarriages( member );
			break;
		}
		
		member = member.familyMember;
	}
};

LayoutFamilyMemberVisitor.prototype.visitChild = function( child ) {
	// There is nothing to do with a child that parent hasn't handled already. Pass the visitor down the chain of responsibility.
	child.familyMember.acceptVisitor( this );
	
};

