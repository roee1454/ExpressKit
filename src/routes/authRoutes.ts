import express from 'express';
import { validateUser, validateUserCredentionals } from '../validation/authValidator';
import { handleEmailVerfication, handleLogin, handleLogout, handlePasswordReset, handleRegister, handleSendPasswordResest, handleSendVerficationEmail } from '../controllers/authController';

const authRouter: express.Router = express.Router();

//User registeration endpoint..
authRouter.post("/register", validateUser, handleRegister);
//User login endpoint..
authRouter.post("/login", validateUserCredentionals, handleLogin);
//Send email verification endpoint..
authRouter.post("/send-verification", handleSendVerficationEmail);
//Send password verification endpoint..
authRouter.post("/send-password-reset", handleSendPasswordResest);
//Password reset endpoint..
authRouter.post("/password-reset", handlePasswordReset);
//Email verification endpoint..
authRouter.get("/email-verification", handleEmailVerfication);
//Logout endpoint..
authRouter.get("/logout", handleLogout);

export default authRouter;