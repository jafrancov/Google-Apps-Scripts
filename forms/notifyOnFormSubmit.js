// NO EJECUTAR ESTE ARCHIVO DIRECTAMENTE, de hacerlo recibiremos el error:
// "TypeError: Cannot read property 'values' of undefined
// SE EJECUTA AUTOMÁTICAMENTE AL RECIBIR UNA RESPUESTA DEL FORMULARIO

function sequenceNumberOnFormSubmit(e) {
	// Llama la función que obtiene el número de registro
    var registro = addSequenceNumber();

	var timestamp = e.values[0];
	var nombre = e.values[1];
	var email = e.values[2];

	var asunto = `Registro número ${registro}`;

	// email_plano es para cuando el correo del receptor no soporta HTML
	var email_plano = `
		Hola ${nombre}, te has registrado correctamente en nuestra web.\n\n
		Tu número de registro es: ${registro}\n\n
		Gracias por confiar en nosotros.\n\n
		Atentamente,\n
		Alejandro Franco
	`;

	var email_html = `
		<h1>Hola ${nombre}, te has registrado correctamente en nuestra web.</h1>
		<p>
			Tu número de registro es: 
			<font color="red"><strong>${registro}</strong></font>
		</p>
		<p>Gracias por confiar en nosotros.</p>
		<p>
			Atentamente,<br>
			<img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" height="50">
			<i>Alejandro Franco</i>
		</p>
	`;

	var optsAvanzadas = { name: "Google Apps Script - Alejandro Franco", htmlBody: email_html };
	MailApp.sendEmail(email, asunto, email_plano, optsAvanzadas);
}

function addSequenceNumber() {
	// Obtiene la hoja donde se guardan las respuestas
	var hoja = SpreadsheetApp.getActiveSheet();
	// Obtiene el último renglón con datos
	var renglon =  SpreadsheetApp.getActiveSheet().getLastRow();
	// Establece el número de registro, que es el número de renglón + 1, considerando el renglón de las cabeceras
	var registro = renglon - 1;
	// Puedes combinarlo con texto si así lo quieres o solamente registrar el número, aquí lo combino con texto,
	// para que quede como ABC-0123, con mínimo 4 dígitos, con ceros a la izquierda.
	var folioRegistro = `ABC-${ Utilities.formatString("%04d", registro)}`;
	// Escribe el número de registro en la celda especificada
	// IMPORTANTE: Cambia el número 4 por el número de la columna donde lo vayas a escribir (A=1, B=2, C=3, D=4, etc.)
	hoja.getRange(renglon, 4).setValue(folioRegistro);
	// Regresa el número de folio
	return folioRegistro;
}
