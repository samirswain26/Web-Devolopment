import { text } from "express";
import Mailgen from "mailgen"
import nodemailer from "nodemailer"

const sendMail = async (options) => {
      const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
                 name: 'Task Manager',
                 link: 'https://mailgen.js/'
                 // Optional product logo
                 // logo: 'https://mailgen.js/img/logo.png'
             }
     });

    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
    var emailHtml = mailGenerator.generate(options.mailGenContent);




    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    const mail = {
        from:  'mail.taskmanager@example.com',
        to: options.email,
        subject: options.subject,
        text: emailText,
        html: emailHtml,
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("email failed", error)
    }

}


const emailVerificationMailContent = (username, verificationUrl) => {
    return {
        body : {
            name: username,
            intro: 'Welcome to App! We\'re very excited to have you on board.',
            action: {
            instructions: 'To get started with our App, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Verify your email',
                link: verificationUrl,
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'

        }
    }
}



const forgotPasswordMailGenContent = (username, forgotPasswordUrl) => {
    return {
        body : {
            name: username,
            intro: 'Forgot Password.',
            action: {
            instructions: 'For chaneg the password, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Verify your email',
                link: forgotPasswordUrl,
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'

        }
    }
}