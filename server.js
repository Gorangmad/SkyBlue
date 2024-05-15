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
  service: 'gmail',
  auth: {
    user: 'noreplyskyblueparking@gmail.com',
    pass: "enet dimj czep wbyd" // Your Gmail password or App password
  }
});




// Handle form submission
app.post('/send-email', (req, res) => {
  const formData = req.body;

  // Construct the email message
  const mailOptions = {
    from:'noreplyskyblueparking@gmail.com', // Sender address
    to: 'info@skyblueparking.com', // Replace with the recipient's email
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

    hinflugZeit = req.body.hinflugTime;
    rueckflugZeit = req.body.rueckflugTime;

    res.redirect('/buchen');
});

// Format date to 'DD.MM.YYYY'
function formatDate(date) {
    return date.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Format time to 'HH:mm'
function formatTime(time) {
    return time.toLocaleString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

const imagePath = path.join(__dirname, '/images/about.webp');

let price;
app.post('/calculate-price', (req, res) => {

  // Calculate the difference in days
  const timeDifference = rueckflugDate - hinflugDate;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  console.log(daysDifference);

  // Set a price based on the days difference
if (daysDifference >= 1 && daysDifference <= 3) {
  price = 50;
} else if (daysDifference >= 4 && daysDifference <= 6) {
  price = 55;
} else if (daysDifference >= 7 && daysDifference <= 9) {
  price = 60;
} else if (daysDifference == 10) {
  price = 60;
} else if (daysDifference >= 11 && daysDifference <= 12) {
  price = 65;
} else if (daysDifference >= 13 && daysDifference <= 14) {
  price = 70;
} else if (daysDifference >= 15 && daysDifference <= 16) {
  price = 70;
} else if (daysDifference >= 17 && daysDifference <= 18) {
  price = 75;
} else if (daysDifference >= 19 && daysDifference <= 20) {
  price = 80;
} else if (daysDifference >= 21 && daysDifference <= 22) {
  price = 85;
} else if (daysDifference >= 23 && daysDifference <= 24) {
  price = 90;
} else if (daysDifference >= 25 && daysDifference <= 26) {
  price = 95;
} else if (daysDifference >= 27 && daysDifference <= 28) {
  price = 100;
} else if (daysDifference >= 29 && daysDifference <= 30) {
  price = 110;
} else {
  // Default price or handle other cases not listed
  price = 150;
}

// Send the calculated price to the frontend
res.status(200).json({ price });

});


app.post('/send-buchung', (req, res) => {
  const formData = req.body;

  // SMTP settings provided by Namecheap
  const smtpConfig = {
    host: 'mail.privateemail.com', // This is the Namecheap SMTP server host
    port: 587, // SMTP port (587 for TLS/STARTTLS, 465 for SSL)
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'info@skyblueparking.com', // Your full email address
      pass: 'Khizerkhizer1' // Your email account password
    },
    tls: {
      // Do not fail on invalid certs (set to true if using self-signed certificates)
      rejectUnauthorized: false
    }
  };
  
  const transporter = nodemailer.createTransport(smtpConfig);
  
  // Verify the connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });



  // Construct the email message
  const mailOptions = {
    from: 'info@skyblueparking.com', // Sender address
    to: 'info@skyblueparking.com', // Replace with the recipient's email
    subject: 'Neue Buchung', // Email subject
    html: `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        h1 {
          text-align: center;
        }
        .booking-details {
          margin-bottom: 20px;
        }
        .booking-details p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="booking-details">
        <p><strong>Vorname:</strong> ${formData.Vorname}</p>
        <p><strong>Nachname:</strong> ${formData.Nachname}</p>
        <p><strong>Email:</strong> ${formData.Email}</p>
        <p><strong>Telefonnummer:</strong> ${formData.Telefonnummer}</p>
        <p><strong>Kennzeichen:</strong> ${formData.Kennzeichen}</p>
        <p><strong>Automarke/-modell:</strong> ${formData.Automarke}</p>
        <p><strong>Hinflug:</strong> ${formData.Hinflug}</p>
        <p><strong>Hinflug Datum:</strong> ${formatDate(hinflugDate)}</p>
        <p><strong>Hinflugzeit:</strong> ${formatTime(hinflugZeit)}</p>
        <p><strong>Rückflug:</strong> ${formData.Rueckflug}</p>
        <p><strong>Rückflug Datum:</strong> ${formatDate(rueckflugDate)}</p>
        <p><strong>Rückflugzeit:</strong> ${formatTime(rueckflugZeit)}</p>
        <p><strong>Farbe:</strong> ${formData.Farbe}</p>
        <p><strong>Abgabe Uhrzeit:</strong> ${formData.UhrzeitAnkunft}</p>
        <p><strong>Preis:</strong> ${price} Euro</p>
      </div>
      </div>
    </body>
    </html>
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
    <html>
    <head>
      <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        line-height: 1.6;
        background-color: #ffffff; /* White background */
        color: #000000; /* Black text */
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }
      h1 {
        text-align: center;
      }
      .booking-details {
        margin-bottom: 20px;
      }
      .booking-details p {
        margin: 5px 0;
      }
      .icon {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
      }
      .picture {
        width: 100%;
        margin-top: 20px;
      }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Vielen Dank für Ihre Buchung bei Sky Blue Parking!</h1>
        <div class="booking-details">
          <p><strong>Vorname:</strong> ${formData.Vorname}</p>
          <p><strong>Nachname:</strong> ${formData.Nachname}</p>
          <p><strong>Email:</strong> ${formData.Email}</p>
          <p><strong>Telefonnummer:</strong> ${formData.Telefonnummer}</p>
          <p><strong>Kennzeichen:</strong> ${formData.Kennzeichen}</p>
          <p><strong>Automarke/-modell:</strong> ${formData.Automarke}</p>
          <p><strong>Hinflug:</strong> ${formData.Hinflug}</p>
          <p><strong>Hinflug Datum:</strong> ${formatDate(hinflugDate)}</p>
          <p><strong>Hinflugzeit:</strong> ${formatTime(hinflugZeit)}</p>
          <p><strong>Rückflug:</strong> ${formData.Rueckflug}</p>
          <p><strong>Rückflug Datum:</strong> ${formatDate(rueckflugDate)}</p>
          <p><strong>Rückflugzeit:</strong> ${formatTime(rueckflugZeit)}</p>
          <p><strong>Farbe:</strong> ${formData.Farbe}</p>
          <p><strong>Abgabe Uhrzeit:</strong> ${formData.UhrzeitAnkunft}</p>
          <p><strong>Preis:</strong> ${price} Euro</p>
        </div>
        <p>Vielen Dank! Wir freuen uns darauf, Sie zu begrüßen.</p>
        <p>Annahme und Abgabe erfolgen am Terminal1 beim Eingang B6 und beim Terminal 2 bei E8.</p>
        <p>Am Tag der Buchung fahren Sie zum Frankfurter Flughafen und rufen uns 30 Minuten bevor Sie eintreffen, an. Wir empfehlen Ihnen 3 Stunden vor Abflug einzutreffen bzw. Ihr Valet-Parking zu buchen. Wenn Sie am Terminal eintreffen, warten wir bereits auf Sie. Die Übergabe des Fahrzeuges erfolgt schnell und unkompliziert. Der Fahrer begutachtet kurz Ihr Fahrzeug auf bereits bestehende Mängel und notiert das Ganze. Sie unterschreiben und übergeben ihm die Schlüssel. Das war es schon.</p>
      </div>
    </body>
    </html>
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

