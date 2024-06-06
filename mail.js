const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

class MailOptions {
    constructor() {
        this.mailOptions = {
            from: {
                name: '',
                address: ''
            },
            to: [], // Array of recipient email addresses
            cc: [], // Array of CC email addresses
            bcc: [], // Array of BCC email addresses
            subject: '',
            text: '',
            html: '',
            attachments: [] // Array of attachments
        };
    }

    /**
     * Sets the company name in the mail options.
     * @param {string} name - The name of the company.
     */
    setCompanyName(name) {
        this.mailOptions.from.name = name;
    }

    /**
     * Sets the sender email address in the mail options.
     * @param {string} email - The email address of the sender.
     */
    setSenderEmail(email) {
        this.mailOptions.from.address = email;
    }

    /**
     * Sets the recipient email address.
     * @param {string} email - The email address of the recipient.
     */
    setRecipientEmail(email) {
        let emails = this.mailOptions.to || [];
        emails.push(email)
        this.mailOptions.to = emails;
    }

    setCC(cc){
        let ccs = this.mailOptions.to || [];
        ccs.push(cc)
        this.mailOptions.to = ccs;
    }

    setCC(bcc){
        let bccs = this.mailOptions.to || [];
        ccs.push(bcc)
        this.mailOptions.to = bccs;
    }

    /**
     * Sets the subject of the email.
     * @param {string} subject - The subject of the email.
     */
    setSubject(subject) {
        this.mailOptions.subject = subject;
    }

    /**
     * Sets the text content of the email.
     * @param {string} text - The text content of the email.
     */
    setText(text) {
        this.mailOptions.text = text;
    }

    /**
     * Sets the HTML content of the email.
     * @param {string} html - The HTML content of the email.
     */
    setHtml(html) {
        this.mailOptions.html = html;
    }


    setAttachments(attachments) {
        // Merge attachments with existing attachments array
        this.mailOptions.attachments = this.mailOptions.attachments.concat(attachments);
    }

    /**
     * Sends the email using the configured options.
     *
     * This function uses the nodemailer transporter to send the email.
     * If an error occurs during sending, it logs the error.
     * If the email is sent successfully, it logs the response from the server.
     *
     * @return {void} Does not return anything
     */
    send() {
        transporter.sendMail(this.mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

// Export the MailOptions class
module.exports = MailOptions;
