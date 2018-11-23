function PostcodeAutofill() {
	var urlPrefix = "http://api.geonames.org/postalCodeLookupJSON?";
	var urlsuffix = "&username=pat_rickb";
	var placenames = [];
	var countryCode = "";
	
	//get value from the fields on the form and set variable coutryCode in dependency to the value
	var countryPicklistValue = document.getElementById("new_land").value;
	var postcode = document.getElementById("postcode").value;
	
	if(countryPicklistValue != null){
		switch(countryPicklistValue) {
			//AUSTRIA 100000024
			case "AUSTRIA":
			countryCode = "AT";
			break;
			
			//BELGIUM 100000004
			case "BELGIUM":
			countryCode = "BE";
			break;
			
			//DEUTSCHLAND 100000000
			case "DEUTSCHLAND":
			countryCode = "DE";
			break;
			
			//FRANCE 100000010
			case "FRANCE":
			countryCode = "FR";
			break;
			
			//ITALY 100000015
			case "ITALY":
			countryCode = "IT";
			break;
			
			//NETHERLANDS 100000022
			case "NETHERLANDS":
			countryCode = "NL";
			break;
			
			//POLAND 100000025
			case "POLAND":
			countryCode = "PL";
			break;
			
			//SWITZERLAND 100000029
			case "SWITZERLAND":
			countryCode = "CH";
			break;
			
			//UNITED KINGDOM 100000002
			case "UNITED KINGDOM":
			countryCode = "GB";
			break;
			
			//UNITED STATES 100000001
			case "UNITED STATES":
			countryCode = "US";
			break;
		}
	} else {
		// give a userfeedback in case there is no value on the driodownfield 
		alert("ACHTUNG: Feld nicht gefüllt: 'Land' Wähle ein Land aus!", "INFORMATION");
	}
	
	//create request-url
	var url = urlPrefix + "postalcode=" + postcode + "&country=" + countryCode + urlsuffix;
	//create request var
	var request = new XMLHttpRequest();
	
	request.open('GET', url, true);
	request.onload = function () {
		
		// Begin accessing JSON data here
		var data = JSON.parse(this.response);
		if (request.status >= 200 && request.status < 400) {
			
			//extract values for placename from the parsed JSON Object and push it to globar placenames Array
			var postalcodesLength = data.postalcodes.length;
			for (i = 0; i < postalcodesLength; i++) {
				placenames.push(data.postalcodes[i].placeName);
			}			
			
			//Checking wether there is definite placename for the postalcode
			if (placenames.length == 1) {
				//set the value of the placename for the inputfield on the form 
				document.getElementById("placename").value = placenames[0];
			} else if (placenames.length > 1) {
				alert("das Ergebnis ist nicht eindeutig, aber du kannst eine der folgenden Städte nehmen: \n" + placenames.toString());
			} else {
				alert("Leider kann kein Ort zu dieser Postleitzahl gefunden werden. Sollte dies ein Fehler sein kontaktiere den CRM Operator. Stichwort >>PostcodeAutofill<< ");
			}

					
		} else {
	    console.log('error');
		}
	}
	
	request.send();
}