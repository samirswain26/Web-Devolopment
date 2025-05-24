import Mailgen from "mailgen"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config({
    path: "../.env"
})

const sendMail = async (options) => {
      const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
                 name: 'Task Manager',
                 link: 'https://taskmanager.app'
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
        from:  'mail.taskmanager@example.com',   // We can name this anything. The mail will go to your Mailtrap inbox
        to: options.email,
        subject: options.subject,
        text: emailText,
        html: emailHtml,
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        // As sending email is not strongly coupled to the business logic it is not worth to raise an error when email sending fails
        // So it's better to fail silently rather than breaking the app
        console.error(
          "Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file",
        );
        console.error("email failed", error)
    }

}


const emailVerificationMailContent = (username, verificationUrl) => {
    return {
        body : {
            name: username,
            intro: 'Welcome to App! We\'re very excited to have you on board.',
            action: {
            instructions: 'To verify your email please click on the following button:',
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
            instructions: 'For change the password, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Reset Your Password',
                link: forgotPasswordUrl,
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'

        }
    }
}


export {sendMail, emailVerificationMailContent, forgotPasswordMailGenContent}