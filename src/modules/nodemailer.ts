import mailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import config from '../config';

const { user, pass } = config;
//transporter configuration to gmail, feel free to use any other mailing service.. (proton, etc...)
const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
      user: user,
      pass: pass
  },
  port: 465,
  host: "smtp.gmail.com"
})

//send mail function, feel free to change it to your liking!
export function sendEmail(
  to: string,
  subject: string,
  body: string,
  callback: (err: Error, info: SMTPTransport.SentMessageInfo) => any
) {
  const emailOptions: mailer.SendMailOptions = {
    to,
    subject,
    text: body || "",
    html: body || "",  
  };

  transporter.sendMail(emailOptions, callback);
}
