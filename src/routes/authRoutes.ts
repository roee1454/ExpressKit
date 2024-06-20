import express from 'express';
import { validateUser, validateUserCredentionals } from '../validation/authValidator';
import { handleCreateUser, handleDeleteUser, handleEmailVerfication, handleGetAllUsers, handleGetCurrentUser, handleGetUser, handleLogin, handleLogout, handlePasswordReset, handleRegister, handleSendPasswordResest, handleSendVerficationEmail, handleUpdateCurrentUser, handleUpdateUser, handleVerifyAuthorization } from '../controllers/authController';

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
//Get all users from database..
authRouter.get("/users", handleVerifyAuthorization, handleGetAllUsers);
//Get current user by token..
authRouter.get("/current-user", handleVerifyAuthorization, handleGetCurrentUser);
//Updating current user info..
authRouter.put("/current-user", handleVerifyAuthorization, handleUpdateCurrentUser);
//Get a user..
authRouter.get("/user/:id", handleVerifyAuthorization, handleGetUser);
//Create a user..
authRouter.post("/user", handleVerifyAuthorization, validateUser ,handleCreateUser);
//Updating a user..
authRouter.put("/user/:id", handleVerifyAuthorization, handleUpdateUser);
//Deleting a user..
authRouter.delete("/user/:id", handleVerifyAuthorization, handleDeleteUser);

export default authRouter;