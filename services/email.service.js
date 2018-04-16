const nodemailer = require('nodemailer');
const config = require('config');

class EmailSender {
    constructor({errors, logger}) {
        this.error = errors;
        this.config = config.email;
        this.logger = logger;
        this.transporter = nodemailer.createTransport({
            host: this.config.host,
            port: this.config.port,
            auth: this.config.credentials
        });
    }

    sendMail(mailOptions) {
        return new Promise((res, rej) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) rej(`send email -> ${error}`);

                res(info);
            });
        });
    }

    sendConfirmEmail({name, email}, callbackUrl) {
        let mailOptions = {
            ...this.config.mailOptions,
            to: email,
            text: `Dear ${name}, thank you for choosing our service  <3`
        };

        mailOptions.html = mailOptions.html.replace(/!href!/g, callbackUrl);

        this.sendMail(mailOptions);
    }

}

module.exports = EmailSender;
