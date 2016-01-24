function sequenceNumberOnFormSubmit(e) {
	// Call the function that generates the sequence number
    var record = addSequenceNumber();

	var timestamp = e.values[0];
	var name = e.values[1];
	var mail = e.values[2];
	
	var subject = "Request number " + record;

	var plain_email_body = "Hello " + name + "!" +
					"\n\n" + 
					"We have registered you request, sent on " + timestamp +
					"\n\n" + 
					"To follow you status ask for the request number" + record;
	var html_body =  "Hello " + name + "!" + 
					"<br/><br/>" + 
					"We have registered you request, sent on <i>" + timestamp + "</i>" +
					"<br/><br/>" + 
					"To follow the status ask for the request number <font color=\"red\"><strong>" + record + "</strong></font>";

	var advancedOpts = { name: "Forms - Alex Franco", htmlBody: html_body };
	MailApp.sendEmail(mail, subject, plain_email_body, advancedOpts);
}

function addSequenceNumber() {
	// Obtain the sheet where we save the answers
	var sheet = SpreadsheetApp.getActiveSheet();
	// Obtain the last row with data
	var row =  SpreadsheetApp.getActiveSheet().getLastRow();
	// Sequence number (record) minus 1, this is due to the headers
	var record = row - 1;
	// Set (or write) the sequence number in the cell specified, change number 4 for the rigth column
	sheet.getRange(row,4).setValue(record);
	// Return the sequence number
	return record;
}
