require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const MailOptions = require('./mail');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');

    const mail = new MailOptions();
    mail.setCompanyName('Coding');
    mail.setSenderEmail(process.env.EMAIL);
    mail.setRecipientEmail(process.env.TO_EMAIL);
    mail.setSubject('Test Email');
    mail.setText('This is a test email');
    mail.setHtml('<p>This is a test email</p>');

    mail.send();
});

app.post('/mail', async (req, res) => {
    console.log(req.body);

    let { receiver_id, subject, text, name } = req.body;

    let htmldata = fs.readFileSync(path.join(__dirname, 'mail.html'), 'utf-8')

    htmldata = htmldata.replace('[User]',name);

    // console.log(htmldata);

    const mail = new MailOptions();
    mail.setCompanyName('Coding');
    mail.setSenderEmail(process.env.EMAIL);
    mail.setRecipientEmail(receiver_id); // Using receiver_id from the request body
    mail.setSubject(subject);
    mail.setText(text);
    mail.setHtml(htmldata);

    mail.setAttachments({
    filename: 'coding.jpeg',
    path: './images/coding.jpeg',
    contentDisposition: 'inline',
    cid: 'coding.jpeg',
    contentType: 'image/jpeg'
    })

    try {
        await mail.send();
        res.send('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
