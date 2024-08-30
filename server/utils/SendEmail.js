const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // Remove the 'message' parameter as it's not needed
    try {
        //making a transporter for mail

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,

            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: options.email, // Use 'options.email' as the recipient
            subject: options.subject,//here the subject
            html: options.message, // Use 'options.message' to define the email message
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;