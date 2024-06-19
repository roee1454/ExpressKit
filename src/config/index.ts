import dotenv from 'dotenv';

dotenv.config();

export default {
    user: process.env.MAILER_EMAIL,
    pass: process.env.GOOGLE_PASS,
}