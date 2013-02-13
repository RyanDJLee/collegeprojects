/*
 * This file contains fake data used to test our Family Tree implementation. Notice that 
 * the specs say that we can choose our own file format, so we choose to store it in a 
 * JavaScript to simplify implementation. Moreover we chose to write directors for each
 * test case where we specify what needs to be created in the construct() method.
 * 
 * Notice that our implementation using the builder pattern provides means to 
 * add different builders in the future that will handle more realitic case.
 * So for example should future specs require us to read for an XML file we simply
 * need to implement an XMLFamilyTreeDirector class that will handle building a family tree
 * from an XML source.
 */
DefaultDirector = function( builder ) {
	this.builder = builder;
};

DefaultDirector.prototype = new FamilyTreeDirector();

DefaultDirector.prototype.construct = function() {
	this.builder.buildFamilyTree();
};

SimplerThanSimplestOfTreesDirector = function( builder ) {
	this.builder = builder;
};

SimplerThanSimplestOfTreesDirector.prototype = new FamilyTreeDirector();

SimplerThanSimplestOfTreesDirector.prototype.construct = function() {
	this.builder.buildFamilyTree();
	var id = "joe";
	this.builder.buildFamilyMember(id, "Joe", "Samplethorp", MALE, "01/01/1970", "", "Joe is a nice guy.");
		
};

SimplestOfTreesDirector = function( builder ) {
	this.builder = builder;
};

SimplestOfTreesDirector.prototype = new FamilyTreeDirector();

SimplestOfTreesDirector.prototype.construct = function() {
	this.builder.buildFamilyTree();
	var fatherId = "joe";
	this.builder.buildFamilyMember(fatherId, "Joe", "Samplethorp", MALE, "01/01/1970", "", "Joe is a nice guy.");
	
	var motherId = "jane";
	this.builder.buildFamilyMember(motherId, "Jane", "Samplethorp", FEMALE, "01/01/1975", "", "Jane is a nice gal.");
	
	var jimId = "jim";
	this.builder.buildFamilyMember(jimId, "Jim", "Samplethorp", MALE, "01/01/1975", "", "");
	
	var child1Id = "joejr";
	this.builder.buildFamilyMember(child1Id, "Joe Jr.", "Samplethorp", MALE, "01/01/2000", "", "Joe Jr. is as nice as his old man.");
	
	var child2Id = "jacky";
	this.builder.buildFamilyMember(child2Id, "Jacky", "Samplethorp", FEMALE, "01/01/2002", "", "");
	
	this.builder.buildMarriage( fatherId, motherId, MARRIED_STATUS );
	this.builder.buildMarriage( jimId,motherId, DIVORCED_STATUS );
	
	//this.builder.buildChild( fatherId, motherId, child1Id, false );
	//this.builder.buildChild( fatherId, motherId, child2Id, false );
		
};

StillSimplefTreeDirector = function( builder ) {
	this.builder = builder;
};

StillSimplefTreeDirector.prototype = new FamilyTreeDirector();

StillSimplefTreeDirector.prototype.construct = function() {
	this.builder.buildFamilyTree();
	var fatherId = "joe";
	this.builder.buildFamilyMember(fatherId, "Joe", "Samplethorp", MALE, "01/01/1950", "", "Joe is a nice guy.");
	
	var motherId = "jane";
	this.builder.buildFamilyMember(motherId, "Jane", "Samplethorp", FEMALE, "01/01/1955", "", "Jane is a nice gal.");
	
	var child1Id = "joejr";
	this.builder.buildFamilyMember(child1Id, "Joe Jr.", "Samplethorp", MALE, "01/01/1980", "", "Joe Jr. is as nice as his old man.");
	
	var child2Id = "jacky";
	this.builder.buildFamilyMember(child2Id, "Jacky", "Samplethorp", FEMALE, "01/01/1982", "", "");
	
	var moId = "mo";
	this.builder.buildFamilyMember(moId, "Mo", "Samplethorp", MALE, "01/01/1989", "", "");
	
	var childsWifeId = "jada";
	this.builder.buildFamilyMember(childsWifeId, "Jada", "Samplethorp", FEMALE, "01/01/1983", "", "");
	
	var audryId = "audry";
	this.builder.buildFamilyMember(audryId, "Audry", "Samplethorp", FEMALE, "01/01/2007", "", "");
	
	var ashleyId = "ashley";
	this.builder.buildFamilyMember(ashleyId, "Ashley", "Samplethorp", FEMALE, "01/01/2008", "", "");
	
	this.builder.buildMarriage( fatherId, motherId, MARRIED_STATUS );
	this.builder.buildMarriage( child1Id, childsWifeId, DIVORCED_STATUS );
	
	this.builder.buildChild( child1Id, childsWifeId, audryId, true );
	this.builder.buildChild( child1Id, childsWifeId, ashleyId, false );
	
	this.builder.buildChild( fatherId, motherId, child1Id, false );
	this.builder.buildChild( fatherId, motherId, child2Id, false );
	this.builder.buildChild( fatherId, motherId, moId, false );
		
};

AustinTreeDirector = function( builder ) {
		this.builder = builder;
};

AustinTreeDirector.prototype = new FamilyTreeDirector();

AustinTreeDirector.prototype.construct = function() {
	this.builder.buildFamilyTree();
	
	// Add all family members.
	var jerryId = "Jerry";
	this.builder.buildFamilyMember(jerryId, "Jerry", "Samplethorp", MALE, "01/01/1940", "02/01/1998", "");
	
	var janeId = "Jane";
	this.builder.buildFamilyMember(janeId, "Jane", "Samplethorp", FEMALE, "01/01/1940", "", "");
	
	var bobId = "Bob";
	this.builder.buildFamilyMember(bobId, "Bob", "Samplethorp", MALE, "01/01/1940", "", "");
	
	var lindsayId = "Lindsay";
	this.builder.buildFamilyMember(lindsayId, "Lindsay", "Samplethorp", FEMALE, "01/01/1970", "", "");
	
	var mikeId = "Mike";
	this.builder.buildFamilyMember(mikeId, "Mike", "Samplethorp", MALE, "01/01/1970", "", "");
	
	var annaId = "Anna";
	this.builder.buildFamilyMember(annaId, "Anna", "Samplethorp", FEMALE, "01/01/2000", "", "");
	
	var mikeJrId = "Mike Jr.";
	this.builder.buildFamilyMember(mikeJrId, "Mike Jr.", "Samplethorp", MALE, "01/01/2000", "", "");
	
	var ashleyId = "Ashley";
	this.builder.buildFamilyMember(ashleyId, "Ashley", "Samplethorp", FEMALE, "01/01/2002", "", "");
	
	var angelaId = "Angela";
	this.builder.buildFamilyMember(angelaId, "Angela", "Samplethorp", FEMALE, "01/01/1970", "", "");
	
	var robertId = "Robert";
	this.builder.buildFamilyMember(robertId, "Robert", "Samplethorp", MALE, "01/01/1970", "", "");
	
	var catherineId = "Catherine";
	this.builder.buildFamilyMember(catherineId, "Catherine", "Samplethorp", FEMALE, "01/01/2000", "", "");
	
	// Build all marriages.
	this.builder.buildMarriage( jerryId, janeId, MARRIED_STATUS );
	this.builder.buildMarriage( bobId, janeId, DIVORCED_STATUS );
	this.builder.buildMarriage( mikeId, lindsayId, MARRIED_STATUS );
	this.builder.buildMarriage( robertId, angelaId, MARRIED_STATUS );
	
	// Build all children.
	this.builder.buildChild( mikeId, lindsayId, annaId, false );
	this.builder.buildChild( mikeId, lindsayId, mikeJrId, false );
	this.builder.buildChild( mikeId, lindsayId, ashleyId, false );
	
	this.builder.buildChild( robertId, angelaId, catherineId, false );
	
	this.builder.buildChild( bobId, janeId, mikeId, false );
	this.builder.buildChild( bobId, janeId, angelaId, false ); 
};

BoingaTreeDirector = function( builder ) {
	this.builder = builder;
};

BoingaTreeDirector.prototype = new FamilyTreeDirector();

BoingaTreeDirector.prototype.construct = function() {
	this.builder.buildFamilyTree();
	
	// Add all family members.
	var ingmarId = "Ingmar";
	this.builder.buildFamilyMember(ingmarId, "Ingmar", "Samplethorp", MALE, "01/01/1940", "", "");
	
	var ingridId = "Ingrid";
	this.builder.buildFamilyMember(ingridId, "Ingrid", "Samplethorp", FEMALE, "01/01/1940", "", "");
	
	var janeId = "Jane";
	this.builder.buildFamilyMember(janeId, "Jane", "Samplethorp", FEMALE, "01/01/1970", "", "");
	
	var jamesId = "James";
	this.builder.buildFamilyMember(jamesId, "James", "Samplethorp", MALE, "01/01/1981", "", "");
	
	var joeId = "Joe";
	this.builder.buildFamilyMember(joeId, "Joe", "Samplethorp", MALE, "01/01/2000", "", "");
	
	var justinId = "Justin";
	this.builder.buildFamilyMember(justinId, "Justin", "Samplethorp", MALE, "01/01/1973", "", "");
	
	var josepheneId = "Josephene";
	this.builder.buildFamilyMember(josepheneId, "Josephene", "Samplethorp", FEMALE, "01/01/1974", "", "");
	
	var katieId = "Katie";
	this.builder.buildFamilyMember(katieId, "Katie", "Samplethorp", FEMALE, "01/01/2002", "", "");
	
	var kalvinId = "Kalvin";
	this.builder.buildFamilyMember(kalvinId, "Kalvin", "Samplethorp", MALE, "01/01/2002", "", "");
	
	// Build all marriages.
	this.builder.buildMarriage( ingmarId, ingridId, MARRIED_STATUS );
	this.builder.buildMarriage( jamesId, janeId, MARRIED_STATUS );
	this.builder.buildMarriage( justinId, josepheneId, MARRIED_STATUS );
	
	// Build all children.
	this.builder.buildChild( jamesId, janeId, katieId, false );
	this.builder.buildChild( jamesId, janeId, kalvinId, false );
	
	this.builder.buildChild( ingmarId, ingridId, janeId, false );
	this.builder.buildChild( ingmarId, ingridId, joeId, false );
	this.builder.buildChild( ingmarId, ingridId, justinId, false );
	
		
};

PabloTreeDirector = function( builder ) {
	this.builder = builder;
};

PabloTreeDirector.prototype = new FamilyTreeDirector();

PabloTreeDirector.prototype.construct = function() {
	this.builder.buildFamilyTree();
	
	// Add all family members.
	var andrewId = "Andrew";
	this.builder.buildFamilyMember(andrewId, "Andrew", "Samplethorp", MALE, "01/01/1940", "", "");
	
	var andreaId = "Andrea";
	this.builder.buildFamilyMember(andreaId, "Andrea", "Samplethorp", FEMALE, "01/01/1940", "", "");
	
	var dollId = "Doll";
	this.builder.buildFamilyMember(dollId, "Doll", "Samplethorp", FEMALE, "01/01/1970", "", "");
	
	var bobId = "Bob";
	this.builder.buildFamilyMember(bobId, "Bob", "Samplethorp", MALE, "01/01/1981", "", "");
	
	var davidId = "David";
	this.builder.buildFamilyMember(davidId, "David", "Samplethorp", MALE, "01/01/1999", "", "");
	
	var bettyId = "Betty";
	this.builder.buildFamilyMember(bettyId, "Betty", "Samplethorp", FEMALE, "01/01/1973", "", "");
	
	var candyId = "Candy";
	this.builder.buildFamilyMember(candyId, "Candy", "Samplethorp", FEMALE, "01/01/1974", "", "");
	
	var billyId = "Billy";
	this.builder.buildFamilyMember(billyId, "Billy", "Samplethorp", MALE, "01/01/1965", "", "");
	
	var joeId = "Joe";
	this.builder.buildFamilyMember(joeId, "Joe", "Samplethorp", MALE, "01/01/1975", "", "");
	
	var brandyId = "Brandy";
	this.builder.buildFamilyMember(brandyId, "Brandy", "Samplethorp", FEMALE, "01/01/1980", "", "");
	
	var emilyId = "Emily";
	this.builder.buildFamilyMember(emilyId, "Emily", "Samplethorp", FEMALE, "01/01/2002", "", "");
	
	var plumberId = "Plumber";
	this.builder.buildFamilyMember(plumberId, "Plumber", "Samplethorp", MALE, "01/01/2002", "", "");
	
	// Build all marriages.
	this.builder.buildMarriage( andrewId, andreaId, MARRIED_STATUS );
	this.builder.buildMarriage( bobId, dollId, MARRIED_STATUS );
	this.builder.buildMarriage( davidId, bettyId, MARRIED_STATUS );
	this.builder.buildMarriage( billyId, candyId, MARRIED_STATUS );
	this.builder.buildMarriage( joeId, brandyId, MARRIED_STATUS );
	
	// Build all children.
	this.builder.buildChild( bobId, dollId, emilyId, false );
	this.builder.buildChild( joeId, brandyId, plumberId, false );
	
	this.builder.buildChild( andrewId, andreaId, bobId, false );
	this.builder.buildChild( andrewId, andreaId, bettyId, false );
	this.builder.buildChild( andrewId, andreaId, billyId, false );
	this.builder.buildChild( andrewId, andreaId, brandyId, false );
	
		
};

ShermanTreeDirector = function( builder ) {
	this.builder = builder;
};

ShermanTreeDirector.prototype = new FamilyTreeDirector();

ShermanTreeDirector.prototype.construct = function() {
	this.builder.buildFamilyTree();
	
	// Add all family members.
	var joseId = "Jose";
	this.builder.buildFamilyMember(joseId, "Jose", "Samplethorp", MALE, "01/01/1940", "", "");
	
	var kimId = "Kim";
	this.builder.buildFamilyMember(kimId, "Kim", "Samplethorp", FEMALE, "01/01/1940", "", "");
	
	var tomId = "Tom";
	this.builder.buildFamilyMember(tomId, "Tom", "Samplethorp", MALE, "10/03/1942", "", "");
	
	var stephanieId = "Stephanie";
	this.builder.buildFamilyMember(stephanieId, "Stephanie", "Samplethorp", FEMALE, "01/01/1961", "", "");
	
	var markId = "Mark";
	this.builder.buildFamilyMember(markId, "Mark", "Samplethorp", MALE, "10/10/1965", "", "");
	
	var edwardId = "Edward";
	this.builder.buildFamilyMember(edwardId, "Edward", "Samplethorp", MALE, "01/01/1973", "", "");
	
	var annieId = "Annie";
	this.builder.buildFamilyMember(annieId, "Annie", "Samplethorp", FEMALE, "01/01/1974", "", "");
	
	var lynnId = "Lynn";
	this.builder.buildFamilyMember(lynnId, "Lynn", "Samplethorp", FEMALE, "01/01/1975", "", "");
		
	// Build all marriages.
	this.builder.buildMarriage( joseId, kimId, DIVORCED_STATUS );
	this.builder.buildMarriage( tomId, kimId, MARRIED_STATUS );

	// Build all children.
	this.builder.buildChild( joseId, kimId, stephanieId, false );
	this.builder.buildChild( joseId, kimId, markId, false );
	this.builder.buildChild( tomId, kimId, edwardId, false );
	this.builder.buildChild( tomId, kimId, annieId, true );
	this.builder.buildChild( tomId, kimId, lynnId, false );	
};

TashaTreeDirector = function( builder ) {
	this.builder = builder;
};

TashaTreeDirector.prototype = new FamilyTreeDirector();

TashaTreeDirector.prototype.construct = function() {
	this.builder.buildFamilyTree();
	
	// Add all family members.
	var michelleId = "Michelle";
	this.builder.buildFamilyMember(michelleId, "Michelle", "Samplethorp", FEMALE, "01/01/1940", "", "");
	
	var tommyId = "Tommy";
	this.builder.buildFamilyMember(tommyId, "Tommy", "Samplethorp", MALE, "01/01/1940", "", "");
	
	var fionaId = "Fiona";
	this.builder.buildFamilyMember(fionaId, "Fiona", "Samplethorp", FEMALE, "10/03/1961", "", "");
	
	var kevinId = "Kevin";
	this.builder.buildFamilyMember(kevinId, "Kevin", "Samplethorp", MALE, "01/01/1959", "", "");
	
	var davidId = "David";
	this.builder.buildFamilyMember(davidId, "David", "Samplethorp", MALE, "10/10/1999", "", "");
	
	// Build all marriages.
	this.builder.buildMarriage( tommyId, michelleId, MARRIED_STATUS );
	this.builder.buildMarriage( kevinId, fionaId, COMMONLAW_STATUS );

	// Build all children.
	this.builder.buildChild( kevinId, fionaId, davidId, false );
	this.builder.buildChild( tommyId, michelleId, fionaId, false );	
};

UniquaTreeDirector = function( builder ) {
	this.builder = builder;
};

UniquaTreeDirector.prototype = new FamilyTreeDirector();

UniquaTreeDirector.prototype.construct = function() {
	this.builder.buildFamilyTree();
	
	// Add all family members.
	var joeyId = "Joey";
	this.builder.buildFamilyMember(joeyId, "Joey", "Samplethorp", MALE, "01/01/1980", "", "");
	
	var daisyId = "Daisy";
	this.builder.buildFamilyMember(daisyId, "Daisy", "Samplethorp", FEMALE, "01/01/1985", "", "");
	
	var kramerId = "Kramer";
	this.builder.buildFamilyMember(kramerId, "Kramer", "Samplethorp", MALE, "10/03/1981", "", "");
	
	var evaId = "Eva";
	this.builder.buildFamilyMember(evaId, "Eva", "Samplethorp", FEMALE, "01/01/1984", "", "");
	
	var tongId = "Tong";
	this.builder.buildFamilyMember(tongId, "Tong", "Samplethorp", MALE, "16/05/2004", "", "");
	
	var claraId = "Clara";
	this.builder.buildFamilyMember(claraId, "Clara", "Samplethorp", FEMALE, "18/02/2005", "", "");
	
	// Build all marriages.
	this.builder.buildMarriage( joeyId, daisyId, MARRIED_STATUS );
	this.builder.buildMarriage( kramerId, evaId, MARRIED_STATUS );

	// Build all children.
	this.builder.buildChild( joeyId, daisyId, tongId, false );
	this.builder.buildChild( joeyId, daisyId, claraId, true );	
	this.builder.buildChild( kramerId, evaId, claraId, false );
	
};

TyroneTreeDirector = function( builder ) {
	this.builder = builder;
};

TyroneTreeDirector.prototype = new FamilyTreeDirector();

TyroneTreeDirector.prototype.construct = function() {
	this.builder.buildFamilyTree();
	
	// Add all family members.
	var tyroneId = "Tyrone";
	this.builder.buildFamilyMember(tyroneId, "Tyrone", "Samplethorp", MALE, "01/01/1940", "", "");
	
	var tyronaId = "Tyrona";
	this.builder.buildFamilyMember(tyronaId, "Tyrona", "Samplethorp", FEMALE, "01/01/1941", "", "");
	
	var tyroneIIId = "TyroneII";
	this.builder.buildFamilyMember(tyroneIIId, "Tyrone II", "Samplethorp", MALE, "10/03/1989", "", "");
	
	var joeId = "Joe";
	this.builder.buildFamilyMember(joeId, "Joe", "Samplethorp", MALE, "01/01/1960", "", "");
	
	var joannaId = "Joanna";
	this.builder.buildFamilyMember(joannaId, "Joanna", "Samplethorp", FEMALE, "16/05/1963", "", "");
	
	var tyronajrId = "Tyronajr";
	this.builder.buildFamilyMember(tyronajrId, "Tyrona Jr.", "Samplethorp", FEMALE, "18/02/2005", "", "");
	
	// Build all marriages.
	this.builder.buildMarriage( tyroneId, tyronaId, MARRIED_STATUS );
	this.builder.buildMarriage( joeId, joannaId, MARRIED_STATUS );

	// Build all children.
	this.builder.buildChild( joeId, joannaId, tyronajrId, false );
	
	this.builder.buildChild( tyroneId, tyronaId, joeId, false );
	this.builder.buildChild( tyroneId, tyronaId, tyroneIIId, false );	
	
	
};
