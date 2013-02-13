var EMAIL, UID, PASSWORD, LIC, LANG, PAYTYPE;
var PRICE = 0;
var CREDIT = 'cc';
var PAYPAL = 'pp';
var CCNUM, CCNAME, PPID, PPPASS, FNAME, LNAME, SAL, SEX, STREET, CITY, STATE, PCODE, COUNTRY;
function validate(form) {	
	var e = form.elements;
	var warn = '';
	var conf = '';
	var intro = '';
	PRICE = 0;

	conf += '---Account Settings---\n';
	if (e.email.value.length == 0) {
		warn += 'Please enter a valid email address\n';
	} else {
		EMAIL = e.email.value;
		conf += 'E-Mail: ' + EMAIL + '\n';
	}

	if (e.username.value.length == 0) {
		warn += 'Please enter your desired user name\n';
	} else {
		UID = e.username.value;
		conf += 'Username: ' + UID + '\n';
	}
	conf += '---Password Check---\n';
	if (e.password.value.length < 8) {
		warn += 'Password must be at least 8 characters long\n';
	} else if (e.password.value != e.cpassword.value) {
		warn += 'Passwords not identical. Please re-type passwords\n';
	} else {
		conf += "Password Confirmation Successful\n";
		PASSWORD = e.password.value;
	}
	conf += '---Site Settings---\n';
	LIC = e.license.value;
	if (LIC == '256KB') {
		PRICE = 1;
	} else if (LIC == '1MB') {
		PRICE = 2;
	} else if (LIC == '10MB') {
		PRICE = 5;
	} else if (LIC == '100MB') {
		PRICE = 10;
	} else if (LIC == '250MB') {
		PRICE = 20;
	} else if (LIC == '500MB') {
		PRICE = 30;
	} else if (LIC == '1GB') {
		PRICE = 50;
	} else if (LIC == '5GB') {
		PRICE = 100;
	} else if (LIC == '10GB') {
		PRICE = 150;
	}
	conf += 'Licensing Plan Selected : ' + LIC + '($' + PRICE + ')\n';
	LANG = e.language.value;
	conf += 'Language selected = ' + LANG + '\n';
	conf += '---Payment Verification---\n';
	var ccok = 1;
	var payok = 1;
	if (e.paytype[0].checked) {
		PAYTYPE = e.paytype[0].value;
		if (e.ccname.value.length == 0) {
			warn += 'Please enter your name exactly as it appears on your card\n';
			ccok = 0;
		} else {
			CCNAME = e.ccname.value;
		}
		if (e.ccnum.value.length == 0) {
			warn += 'Please enter your credit card number\n';
			ccok = 0;
		} else {
			CCNUM = e.ccnum.value;
		}
		if (ccok == 1) {
			conf += e.cctype.value + ' information entered successfully\n';
		}
	} else if (e.paytype[1].checked) {
		if (e.ppid.value.length == 0) {
			warn += 'Please enter your PayPal id\n';
			payok = 0;
		} else {
			PPID = e.ppid.value;
		}
		if (e.pppass.value.length == 0) {
			warn += 'Please enter your PayPal account password\n';
			payok = 0;
		} else {
			PPPASS = e.pppass.value;
		}
		if (payok == 1) {
			conf += 'Paypal account information entered successfully\n';
		}
	} else {
		warn += 'Please select a payment option and enter payment details\n';
	}	
	conf += '---Personal Information---\n';
	
	var found = 0;
	for (var i = 0; i < e.sal.length; i++) {
		if (e.sal[i].checked) {
			SAL = e.sal[i].value;
			i = e.sal.length;
			found = 1;
		}
	}
	if (found == 0) {
		warn += 'Please select a salutation\n';
	} else {
		conf += 'Name: ' + SAL + ' ';
	}
	
	if (e.fname.value.length == 0) {
		warn += 'Please enter your given birth name\n';
	} else {
		FNAME = e.fname.value;
		conf += FNAME + ' ';
	}
		
	if (e.lname.value.length == 0) {
		warn += 'Please enter your surname\n';
	} else {
		LNAME = e.lname.value;
		conf += LNAME + '\n'
		intro = 'Please confirm the following information\n';
		conf = intro + conf;
	}
		
	if (e.sex[0].checked) {
		SEX = e.sex[0].value;
		conf += 'Gender : ' + SEX + '\n';
	} else if (e.sex[1].checked) {
		SEX = e.sex[1].value;
		conf += 'Gender : ' + SEX + '\n';
	} else {
		warn += 'Please select your gender\n';
	}
	
	if (e.byr.value.length == 0) {
		warn += 'Please enter your year of birth\n';
	} else {
		conf += 'Date of Birth: ' + e.bday.value + '/' + e.bmo.value + '/' + e.byr.value + '\n';
	}

	conf += '---Billing Address---\n';

	var addr = '';	
	if (e.street.value.length == 0) {
		warn += 'Please enter the number and street of your home address\n';
	} else {
		STREET = e.street.value;
		addr += STREET;
	}		
	if (e.city.value.length == 0) {
		warn += 'Please enter your city of residence\n';
	} else {
		CITY = e.city.value;
		addr += '\n' + CITY;
	}		
	if (e.state.value.length == 0) {
		warn += 'Please enter your state or province or XX if none\n';
	} else {
		STATE = e.state.value;
		addr += ', ' + STATE + '\n';
	}		
	if (e.pcode.value.length == 0) {
		warn += 'Please enter your zip or postal code\n';
	} else {
		PCODE = e.pcode.value;
		addr += PCODE + '\n';
	}		
	if (e.country.value.length == 0) {
		warn += 'Please enter your country of residence\n';
	} else {
		COUNTRY = e.country.value;
		addr += COUNTRY + '\n';
	}
	
	conf += addr + '---Charge Confirmation---\n';
	conf += 'Total Amount Charged = $' + PRICE + ' (Licensing Plan) + $1 (Registration Fee) = $' + (PRICE + 1) + '\n';	
	if (warn) {
		alert('Form could not be submitted.  Please correct following errors:\n' + warn);
		return false;
	} else {
		confirm(conf);
		return true;
	}
}
