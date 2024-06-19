
# Ultimate Express Starter Kit - Setup Guide

Follow these simple steps to configure your `.env` file and get your backend service up and running quickly.

## 1. Choose Your Own Port

Specify the port number on which your backend server will run.

PORT=3000

## 2. JWT Secret Key

Generate a random secret key for JWT authentication. You can use an online generator or simply mash your head on the keyboard!

JWT_SECRET_KEY=your_random_secret_key

## 3. Email Configuration

To set up email support, follow these steps:

1. **Create a Google Account**
2. **Activate 2-Factor Authentication (2FA)**
   - Go to your Google Account settings and enable 2FA.
3. **Generate an App Password**
   - Visit [Google App Passwords](https://myaccount.google.com/apppasswords) to create a custom password for your app.

Fill in your email and the generated app password:

MAILER_EMAIL=your_email@gmail.com
GOOGLE_PASS=your_generated_app_password

## 4. File Management

Specify the form-data field name used by the client for file uploads.

FILE_FORM_NAME=your_form_data_field_name

## 5. Database Configuration

Provide the database URL. For MongoDB, ensure you include the cluster name to avoid the app name error.

DATABASE_URL=your_database_url

### Example for MongoDB:

If your MongoDB connection string is `mongodb+srv://username:password@cluster0.mongodb.net/test?retryWrites=true&w=majority`, your `DATABASE_URL` should look something like this:

DATABASE_URL=mongodb+srv://username:password@cluster0.mongodb.net/your_cluster_name?retryWrites=true&w=majority

## Final Note

Once you have filled out the `.env` file with the necessary details, you are ready to start your server and enjoy your fully-featured backend service!

npm start:dev

If you have any issues or need further assistance, feel free to make an issue about it and I will try to help.
