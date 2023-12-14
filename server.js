const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');


// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const transporter = nodemailer.createTransport({
  host: 'smtp.strato.de',
  port: 587, // Use 587 for TLS
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'info@skyblueparking.com',
    pass: process.env.EP
  }
});



// Handle form submission
app.post('/send-email', (req, res) => {
  const formData = req.body;

  // Construct the email message
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Replace with the recipient's email
    subject: 'New Contact Form Submission',
    html: `
      <p><strong>Vorname:</strong> ${formData.Vorname}</p>
      <p><strong>Nachname:</strong> ${formData.Nachname}</p>
      <p><strong>Email:</strong> ${formData.Email}</p>
      <p><strong>Telefonnummer:</strong> ${formData.Telefonnummer}</p>
      <p><strong>Nachricht:</strong> ${formData.message}</p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email Sent');
    }
  });
});

let hinflugDate;
let rueckflugDate;
let hinflugZeit;
let rueckflugZeit;

app.post('/send-datum', (req, res) => {

   hinflugDate = new Date(req.body.hinflugDate);
   rueckflugDate = new Date(req.body.rueckflugDate);

  hinflugZeit = req.body.hinflugTime
  rueckflugZeit = req.body.rueckflugTime

  res.redirect('/buchen');
});


let price;
app.post('/calculate-price', (req, res) => {

  // Calculate the difference in days
  const timeDifference = rueckflugDate - hinflugDate;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  console.log(daysDifference);

  // Set a price based on the days difference
  if (daysDifference >= 1 && daysDifference <= 7) {
    price = 44 + (daysDifference - 1) * 2;
  } else if (daysDifference > 7 && daysDifference <= 14) {
    price = 56 + (daysDifference - 8) * 2;
  } else if (daysDifference > 14 && daysDifference <= 21) {
    price = 82 + (daysDifference - 15) * 3;
  } else if (daysDifference > 21 && daysDifference <= 28) {
    price = 112 + (daysDifference - 22) * 5;
  } else {
    // Default price or handle other cases
    price = 150;
  }  
  // Send the calculated price to the frontend
  res.status(200).json({ price });
});


app.post('/send-buchung', (req, res) => {
  const formData = req.body;

  // Create a transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.strato.de',
    port: 587,
    secure: false, // Set to true if your provider requires SSL/TLS
    auth: {
      user: 'info@skyblueparking.com', // Replace with your Strato email
      pass: process.env.EP, // Replace with your Strato email password or an app password
    },
  });

  // Construct the email message
  const mailOptions = {
    from: 'info@skyblueparking.com', // Sender address
    to: 'info@skyblueparking.com', // Replace with the recipient's email
    subject: 'Neue Buchung', // Email subject
    html: `
      <p><strong>Vorname:</strong> ${formData.Vorname}</p>
      <p><strong>Nachname:</strong> ${formData.Nachname}</p>
      <p><strong>Email:</strong> ${formData.Email}</p>
      <p><strong>Telefonnummer:</strong> ${formData.Telefonnummer}</p>
      <p><strong>Kennzeichen:</strong> ${formData.Kennzeichen}</p>
      <p><strong>Automarke/-modell:</strong> ${formData.Automarke}</p>
      <p><strong>Hinflug Nr.:</strong> ${formData.Hinflug}</p>
      <p><strong>Hinflug Datum:</strong> ${hinflugDate}</p>
      <p><strong>Hinflugzeit:</strong> ${hinflugZeit}</p>
      <p><strong>Rueckflug Nr.:</strong> ${formData.Rueckflug}</p>
      <p><strong>Rückflug Datum:</strong> ${rueckflugDate}</p>
      <p><strong>Rückflugzeit:</strong> ${rueckflugZeit}</p>
      <p><strong>Farbe:</strong> ${formData.Farbe}</p>
      <p><strong>Farbe:</strong> ${price}</p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email Sent');
    }
  });

   // Construct the email message for the user
   const userMailOptions = {
    from: 'info@skyblueparking.com', // Sender address
    to: formData.Email, // User's email address
    subject: 'Vielen Dank für Ihre Buchung', // Email subject
    html: `
      <p>Vielen Dank für Ihre Buchung bei Sky Blue Parking!</p>
      <p>Hier sind die Details Ihrer Buchung:</p>
      <p><strong>Vorname:</strong> ${formData.Vorname}</p>
      <p><strong>Nachname:</strong> ${formData.Nachname}</p>
      <p><strong>Email:</strong> ${formData.Email}</p>
      <p><strong>Telefonnummer:</strong> ${formData.Telefonnummer}</p>
      <p><strong>Kennzeichen:</strong> ${formData.Kennzeichen}</p>
      <p><strong>Automarke/-modell:</strong> ${formData.Automarke}</p>
      <p><strong>Hinflug:</strong> ${formData.Hinflug}</p>
      <p><strong>Hinflug Datum:</strong> ${hinflugDate}</p>
      <p><strong>Hinflug Zeit:</strong> ${hinflugZeit}</p>
      <p><strong>Rückflug:</strong> ${formData.Rueckflug}</p>
      <p><strong>Rückflug Datum:</strong> ${rueckflugDate}</p>
      <p><strong>Rückflug Zeit:</strong> ${rueckflugZeit}</p>
      <p><strong>Farbe:</strong> ${formData.Farbe}</p>
      <p><strong>Preis:</strong> ${price} Euro</p>
      <p>Vielen Dank! Wir freuen uns darauf, Sie zu begrüßen.</p>
      <p>Annahme und Abgabe erfolgen am Terminal1 beim Eingang B6 und beim Terminal 2 bei E8 </p>
      <p>Am Tag der Buchung fahren sie zum Frankfurter Flughafen und rufen uns 30 Minuten bevor sie eintreffen, an. Wir empfehlen ihnen 3 Stunden vor Abflug einzutreffen bzw. ihr Valet-parking zu buchen. Wenn sie am Terminal eintreffen, warten wir bereits auf sie. Die Übergabe des Fahrzeuges erfolgt schnell und unkompliziert. Der Fahrer begutachtet kurz ihr Fahrzeug auf bereits bestehende Mängel und notiert das Ganze. Sie unterschreiben und übergeben ihm die Schlüssel. Das war es schon.</p>
    `,
  };

  // Send the email to the user
  transporter.sendMail(userMailOptions, (errorUser, infoUser) => {
    if (errorUser) {
      console.error('Error sending user email:', errorUser);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Both emails sent successfully
    res.status(200).send('Emails sent successfully');
  });
});



// Start the server
const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

