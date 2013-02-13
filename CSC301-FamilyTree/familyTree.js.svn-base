/**
 * An exception used to signal that a method is not implemented, i.e. it's abstract.
 */
var NOT_IMPLEMENTED_EXCEPTION = "not implemented";

/**
 * Global marriage constants.
 */
var MARRIED_STATUS = "married";
var COMMONLAW_STATUS = "commonlaw";
var SEPARATED_STATUS = "separated";
var DIVORCED_STATUS = "divorced";
var WIDOWED_STATUS = "widowed";

/**
 * Exception to signal multiple current marriages.
 */
var MULTIPLE_MARRIAGE_EXCEPTION = "multiple marriage";

/**
 * Gender global variables.
 */
var MALE = "m";
var FEMALE = "f";
var DEFAULT_PHOTO = 'lib/noimage.gif';
/**
 * A family tree.
 */
FamilyTree = function(){
	/**
	 * All family members in this tree.
	 */
	this.familyMembers = [];
	
	/**
	 * Adds a family member to the family tree.
	 * 
	 * @param familyMember - a new family member.
	 */
	this.addFamilyMember = function( familyMember ) {
		this.familyMembers[familyMember.getId()] = familyMember;
	};
	
	/**
	 * Removes a family member form the tree.
	 * 
	 * @param familyMember - family member to be removed.
	 */
	this.removeFamilyMember = function( familyMember ) {
		this.familyMembers[familyMember.getId()] = null;
	};
	
	/**
	 * Updates family member in the tree. Basically just replaces the existing member.
	 * @param familyMember - updated member.
	 */
	this.updateFamilyMember = function( familyMember ) {
		this.addFamilyMember( familyMember );
	};
};

/**
 * An "abstract" family member class.
 */
FamilyMember = function(){
};

FamilyMember.prototype = {
		getId : function(){
			return this.id;
		},
		
		setId : function( id ){
			this.id = id;
		},
		
		getFirstName : function(){
			return this.firstName;
		},
		
		setFirstName : function( firstName ){
			this.firstName = firstName;
		},
		
		getLastName : function(){
			return this.lastName;
		},
		
		setLastName : function( lastName ){
			this.lastName = lastName;
		},
		
		getGender : function(){
			return this.gender;
		},
		
		setGender : function( gender ){
			this.gender = gender;
		},
		
		getDateOfBirth : function(){
			return this.dateOfBirth;
		},
		
		setDateOfBirth : function( dateOfBirth ){
			this.dateOfBirth = dateOfBirth;
		},
		
		getDateOfDeath : function(){
			return this.dateOfDeath;
		},
		
		setDateOfDeath : function( dateOfDeath ){
			this.dateOfDeath = dateOfDeath;
		},
		
		getNotes : function(){
			return this.notes;
		},
		
		setNotes : function( notes ){
			this.notes = notes;
		},
		
		getDivorce : function(){
			return this.divorce;
		},
		
		setDivorce : function(){
			this.divorce = true;
		},
		
		getImg : function(){
			return this.img;
		},
		
		setImg : function(img){
			this.img = img;
		},
		
		getPhoto : function(){
			return this.photo;
		},
		
		setPhoto : function(photo){
			this.photo = photo;
		},
		
		/**
		 * A function to accept a visitor. Visitors can be used for various tasks, 
		 * but we plan to use it primarily for traversing the family tree. Since this is an abstract class
		 * it throws an exception if not implemented.
		 *  
		 * @param visitor - a FamilyVisitor instance used to traverse family tree this member belongs to.
		 */
		acceptVisitor : function( visitor ) {
			throw NOT_IMPLEMENTED_EXCEPTION;
		}
};

FamilyMemberImpl = function() {
	
};

FamilyMemberImpl.prototype = new FamilyMember();
FamilyMemberImpl.prototype.id = null;
FamilyMemberImpl.prototype.firstName = null;
FamilyMemberImpl.prototype.lastName = null;
FamilyMemberImpl.prototype.gender = null;
FamilyMemberImpl.prototype.dateOfBirth = "";
FamilyMemberImpl.prototype.dateOfDeath = "";
FamilyMemberImpl.prototype.notes = "";
FamilyMemberImpl.prototype.photo = DEFAULT_PHOTO;
FamilyMemberImpl.prototype.img = null;
FamilyMemberImpl.prototype.acceptVisitor = function( visitor ){
	visitor.visitFamilyMember( this );
};

/**
 * Defines an "abstract" class for decorators on top of FamilyMember.
 * @param familymember - a decorated FamilyMember instance.
 */
FamilyMemberDecorator = function(familyMember){
	this.familyMember = familyMember;
};

FamilyMemberDecorator.prototype = {
		familyMember : null,
		
		getId : function(){
			return this.familyMember.getId();
		},
		
		setId : function( id ){
			this.familyMember.setId(id);
		},
		
		getFirstName : function(){
			return this.familyMember.getFirstName();
		},
		
		setFirstName : function( firstName ){
			this.familyMember.setFirstName(firstName);
		},
		
		getLastName : function(){
			return this.familyMember.getLastName();
		},
		
		setLastName : function( lastName ){
			this.familyMember.setLastName(lastName);
		},
		
		getGender : function(){
			return this.familyMember.getGender();
		},
		
		setGender : function( gender ){
			this.familyMember.setGender(gender);
		},
		
		getDateOfBirth : function(){
			return this.familyMember.getDateOfBirth();
		},
		
		setDateOfBirth : function( dateOfBirth ){
			this.familyMember.setDateOfBirth(dateOfBirth);
		},
		
		getDateOfDeath : function(){
			return this.familyMember.getDateOfDeath();
		},
		
		setDateOfDeath : function( dateOfDeath ){
			this.familyMember.setDateOfDeath(dateOfDeath);
		},
		
		getNotes : function(){
			return this.familyMember.getNotes();
		},
		
		setNotes : function( notes ){
			this.familyMember.setNotes(notes);
		},
		
		getDivorce : function(){
			this.familyMember.getDivorce();
		},
		
		setDivorce : function(){
			this.familyMember.divorce = true;
		},
		
		getImg : function(){
			return this.img;
		},
		
		setImg : function(img){
			this.img = img;
		},
		
		getPhoto : function(){
			return this.photo;
		},
		
		setPhoto : function(photo){
			this.photo = photo;
		}
};

/**
 * A parent decorator adding parent responsibilities to a FamilyMember. Parents have zero or more children.
 * @param familyMember - a decorated FamilyMember instance.
 */
Parent = function(familyMember){
	this.familyMember = familyMember;
	this.children = [];
};

Parent.prototype = new FamilyMemberDecorator();
Parent.prototype.children = null;

/**
 * Adds a child to this parent. Also associated the child with this parent on child's end.
 * @param child - a child family member.
 */
Parent.prototype.addChild = function( child ){
	this.children.push( child );
};

Parent.prototype.acceptVisitor = function( visitor ) {
	visitor.visitParent( this );
};

/**
 * A child decorator adding child responsibility to a FamilyMember. Every family member should be a child, however for those members that are the root of a family we might not have this information.
 */
Child = function(familyMember, isAdopted){
		this.familyMember = familyMember;
		this.isAdopted = isAdopted;
};

Child.prototype = new FamilyMemberDecorator();
Child.prototype.mother = null;
Child.prototype.father = null;
Child.prototype.isAdopted = null;

Child.prototype.getMother = function() {
	return this.mother;
};

Child.prototype.setMother = function(mother) {
	this.mother = mother;
};

Child.prototype.getFather = function(){
	return this.father;
};

Child.prototype.setFather = function(father){
	this.father = father;
};

Child.prototype.acceptVisitor = function( visitor ) {
	visitor.visitChild( this );
};

/**
 * A spouse decorator adding marriage responsibility to a FamilyMember.
 */
Spouse = function(familyMember){
	this.familyMember = familyMember;
	this.marriages = [];
};

Spouse.prototype = new FamilyMemberDecorator();

/**
 * Marriage that makes this member a spouse.
 */
Spouse.prototype.marriages = null;

/**
 * Keeps track of crrent marriage so we can prevent multiple current marriages.
 */
Spouse.prototype.current = null;

/**
 * Adds a marriage to this spouse.
 * @param marriage - a new marriage.
 */
Spouse.prototype.addMarriage = function( marriage ){
	if( marriage.status == MARRIED_STATUS || marriage.status == COMMONLAW_STATUS ) {
		if( this.current == null ) {
			this.current = marriage;
		} else {
			// We have a problem. Duplicate current marriage. Multiple marriages not allowed.
			throw MULTIPLE_MARRIAGE_EXCEPTION;
		}
	}
	
	this.marriages.push( marriage );
};

Spouse.prototype.acceptVisitor = function( visitor ) {
	visitor.visitSpouse( this );
};



/**
 * Marriage represents a union between a man and a woman. Per requirements we do not handle any other marriages.
 */
Marriage = function( husband, wife, status ){
	this.husband = husband;
	this.wife = wife;
	this.status = status;
};

Marriage.prototype = {
		husband : null,
		wife : null,
		status : null
};

/**
 * An "abstract" factory used to create family members.
 * TODO How necessary is this "abstract class" in JS? I mean JS is not strongly typed, so as long as an object has one of the create methods defined it will work. 
 */
AbstractFamilyMemberFactory = function(){
};
	
/**
 * Creates a family members using the provided information.
 * @param firstName - first name of the new member.
 * @param lastName - last name of the new member.
 * @param dateOfBirth - date of birth of the new member. 
 * @param dateOfDeath - date of death of the new member.
 * @param notes - notes about the new member.
 * 
 * @return a new FamilyMember.
 */
AbstractFamilyMemberFactory.prototype.createFamilyMember = function(id, firstName, lastName, gender, dateOfBirth, dateOfDeath, notes ){
	throw NOT_IMPLEMENTED_EXCEPTION;
	
	// The IDE gave me a lot of problems so I had to add this return. Not reachable code, just a hack.
	return null;
};

/**
 * Adds parent responsibility on a family member.
 * @param familyMember - a member on which we want to add parent responsibility.
 * 
 * @return specified family member as a parent.
 */
AbstractFamilyMemberFactory.prototype.createParent = function( familyMember ) {
	throw NOT_IMPLEMENTED_EXCEPTION;
	
	// The IDE gave me a lot of problems so I had to add this return. Not reachable code, just a hack.
	return null;
};

/**
 * Adds child responsibility on a family member.
 * @param familyMember - a member on which we want to add parent responsibility.
 * @param isAdopted - true if this is an adopted child; false otherwise.
 * 
 * @return specified family member as a child.
 */
AbstractFamilyMemberFactory.prototype.createChild = function( familyMember, isAdopted ) {
	throw NOT_IMPLEMENTED_EXCEPTION;
	
	// The IDE gave me a lot of problems so I had to add this return. Not reachable code, just a hack.
	return null;
};

/**
 * Adds spouse responsibility on a family member.
 * @param familyMember - a member on which we want to add parent responsibility.
 * 
 * @return specified family member as a spouse.
 */
AbstractFamilyMemberFactory.prototype.createSpouse = function( familyMember ) {
	throw NOT_IMPLEMENTED_EXCEPTION;
	
	// The IDE gave me a lot of problems so I had to add this return. Not reachable code, just a hack.
	return null;
};

/**
 * A simple implementation of FamilyFactory.
 */
FamilyMemberFactoryImpl = function(){	
};

FamilyMemberFactoryImpl.prototype = new AbstractFamilyMemberFactory();

/**
 * Creates a family members using the provided information.
 * @param firstName - first name of the new member.
 * @param lastName - last name of the new member.
 * @param gender - gender of the new member.
 * @param dateOfBirth - date of birth of the new member. 
 * @param dateOfDeath - date of death of the new member.
 * @param notes - notes about the new member.
 * 
 * @return a new FamilyMember.
 */
FamilyMemberFactoryImpl.prototype.createFamilyMember = function(id, firstName, lastName, gender, dateOfBirth, dateOfDeath, notes){
	var familyMember = new FamilyMemberImpl();
	familyMember.id = id;
	familyMember.firstName = firstName;
	familyMember.lastName = lastName;
	familyMember.gender = gender;
	familyMember.dateOfBirth = dateOfBirth;
	familyMember.dateOfDeath = dateOfDeath;
	familyMember.notes = notes;
	familyMember.divorce=false;
	familyMember.photo=DEFAULT_PHOTO;
	
	return familyMember;
};

/**
 * Adds parent responsibility on a family member.
 * @param familyMember - a member on which we want to add parent responsibility.
 * 
 * @return specified family member as a parent.
 */
FamilyMemberFactoryImpl.prototype.createParent = function( familyMember ) {
	return new Parent( familyMember );
};

/**
 * Adds child responsibility on a family member.
 * @param familyMember - a member on which we want to add parent responsibility.
 * @param isAdopted - true if this is an adopted child; false otherwise.
 * 
 * @return specified family member as a child.
 */
FamilyMemberFactoryImpl.prototype.createChild = function( familyMember, isAdopted ) {
	return new Child( familyMember, isAdopted );
};

/**
 * Adds spouse responsibility on a family member.
 * @param familyMember - a member on which we want to add parent responsibility.
 * 
 * @return specified family member as a spouse.
 */
FamilyMemberFactoryImpl.prototype.createSpouse = function( familyMember ) {
	return new Spouse( familyMember );
};

/**
 * Abstract director interface for building Family Trees.
 * @param builder - a concrete builder used to build a family tree.
 */
FamilyTreeDirector = function( builder ) {
	
	this.builder = builder;
};

FamilyTreeDirector.prototype = {
	builder : null,
	
	/**
	 * Constructs a family tree using the builder.
	 */
	construct : function() {
		throw NOT_IMPLEMENTED_EXCEPTION;
	}	
};

/**
 * A builder class which defines an interface for creating a Family Tree. It provides a default builder implementation.
 * 
 * @param familyMemberFactory - a FamilyMemberFactory used to create family members
 */
FamilyTreeBuilder = function( familyMemberFactory ) {
	this.familyMemberFactory = familyMemberFactory;
};

FamilyTreeBuilder.prototype = {
	/**
	 * Product.
	 */
	familyTree : null,
	
	/**
	 * Factory used to create family members.
	 */
	familyMemberFactory : null,
	
	buildFamilyTree : function() {
		this.familyTree = new FamilyTree();
	},
	
	/**
	 * Builds a family member and adds it to the family tree.
	 * 
	 * @param firstName - first name of the new member.
	 * @param lastName - last name of the new member.
	 * @param dateOfBirth - date of birth of the new member. 
	 * @param dateOfDeath - date of death of the new member.
	 * @param notes - notes about the new member.
	 */
	buildFamilyMember : function(id, firstName, lastName, gender, dateOfBirth, dateOfDeath, notes) {
		var member = this.familyMemberFactory.createFamilyMember(id, firstName, lastName, gender, dateOfBirth, dateOfDeath, notes);
		this.familyTree.addFamilyMember( member );
	},
	
	/**
	 * Builds a marriage between two family members.
	 */
	buildMarriage : function(husbandId, wifeId, status) {
		// Add decorators on top of family members and make a marriage between the two.
		var husband = this.familyTree.familyMembers[husbandId];
		if( husband.marriages == null ) {
			husband = this.familyMemberFactory.createSpouse( husband );
			this.familyTree.updateFamilyMember(husband);
		}
		
		var wife = this.familyTree.familyMembers[wifeId];
		if( wife.marriages == null ) {
			wife = this.familyMemberFactory.createSpouse( wife );
			this.familyTree.updateFamilyMember(wife);
		}
		
		var marriage = new Marriage(husband, wife, status);
		
		// Add this marriage to spouses. Let it throw if this is an invalid marriage.
		husband.addMarriage( marriage );
		wife.addMarriage( marriage );
		
		
	},
	
	/**
	 * Builds a parent-child relationship between family members.
	 */
	buildChild : function( fatherId, motherId, childId, isAdopted ) {
		var child = this.familyTree.familyMembers[childId];
		child = this.familyMemberFactory.createChild( child, isAdopted );
		this.familyTree.updateFamilyMember(child);
		
		var mother = this.familyTree.familyMembers[motherId];
		if( mother.children == null ) {
			mother = this.familyMemberFactory.createParent( mother );
			this.familyTree.updateFamilyMember(mother);
		}
		
		var father = this.familyTree.familyMembers[fatherId];
		if( father.children == null ) {
			father = this.familyMemberFactory.createParent( father );
			this.familyTree.updateFamilyMember(father);
		}
		
		child.mother = mother;
		child.father = father;
		
		mother.addChild( child );
		father.addChild( child );
	},
	
	/**
	 * @return Final product (in this case a family tree).
	 */
	getResult : function() {
		return this.familyTree;
	}
};
