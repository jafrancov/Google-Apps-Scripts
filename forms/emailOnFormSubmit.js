function emailOnFormSubmit(e) {

	// Create as many variables as answers (columns in your spreadsheet) you require to send
	var timestamp = e.values[0];
	var name = e.values[1];
	var city = e.values[2];
	var mail = e.values[3];
	
	// The subject of the email
	var subject = "Test Confirmation for " + name;

	// emailBody is for those devices that can't render HTML, is plain text
	var emailBody = "This is an email test for the user " + name + 
					"\nFrom " + city + 
					"\nWith email " + mail + 
					"\nRegister on " + timestamp +
					"\n\nThank you for register!"; 
	
	// html is for those devices that can render HTML
	// nowadays almost all devices can render HTML
	var htmlBody =  "Thank you, your form was submitted on <i>" + timestamp + "</i>" + 
					"<br/><br/>The details you entered were as follows: " +
					"<br/>Your Name: <font color=\"red\"><strong>" + name + "</strong></font>" +
					"<br/>From: " + city + 
					"<br/>With email: " + mail;
	
	// More info for Advanced Options Parameters 
	// https://developers.google.com/apps-script/reference/mail/mail-app#sendEmail(String,String,String,Object)
	var advancedOpts = { name: "Forms - Alex Franco", htmlBody: htmlBody };

	// This instruction sends the email
	MailApp.sendEmail(mail, subject, emailBody, advancedOpts);

}
