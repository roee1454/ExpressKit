import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../modules/nodemailer";
import { PrismaClient } from "@prisma/client";
import type { Response, Request, NextFunction } from "express";
import type {
  UserCredentionals,
  User,
  RequestWithUser,
} from "../types/authTypes";

//Global Variables
const secretKey = process.env.JWT_SECRET_KEY;

export async function handleRegister(req: Request, res: Response) {
  let user: User = req.body;

  const prisma = new PrismaClient();

  console.log(user);

  //Check for existing user
  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (existingUser) {
    return res.status(400).send("User already exists! Please Sign in");
  }

  //Hashing user password
  const hashedPassword = bcrypt.hashSync(user.passwordHash, 10);
  user.passwordHash = hashedPassword;

  //Pushing the user into the database
  const resultUser = await prisma.user.create({
    data: {
      ...user,
      isVerified: false,
    },
  });

  //Signing auth token for a week
  const token = jwt.sign({ id: resultUser.id }, secretKey, {
    expiresIn: 1 * 60 * 60 * 24 * 7,
  });

  await prisma.$disconnect();

  return res
    .status(200)
    .cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 30 })
    .send("User signed in sucessfully!");
}

export async function handleLogin(req: Request, res: Response) {
  const userCredentionals: UserCredentionals = req.body;
  const prisma = new PrismaClient();

  //Find existing user via email
  const user = await prisma.user.findUnique({
    where: { email: userCredentionals.email },
  });

  if (!user) {
    return res.status(500).send("Invalid email or password");
  }

  //Check if the provided password is equal to it's hashed version
  const isPasswordValid = bcrypt.compareSync(
    userCredentionals.password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    return res.status(501).send("Invalid email or password");
  }

  //Signing auth token for a week
  const token = jwt.sign({ id: user.id }, secretKey, {
    expiresIn: 1 * 60 * 60 * 24 * 7,
  });

  await prisma.$disconnect();

  return res
    .status(200)
    .cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 30 })
    .send("User signed in sucessfully!");
}

//Handle sending email verification mail
export function handleSendVerficationEmail(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) {
    return res.status(500).send("Invalid Email!");
  }
  sendEmail(
    email,
    "Verify Your Email!",
    `<div>
      <a href="http://localhost:3000/email-verfication">Press here in order to verify your email</a>
    </div>`,
    (err: Error, info) => {
      if (err) {
        return res.status(501).send(err.message);
      }
      return res.status(200).send(`Email sent successfully: ${info.response}`);
    }
  );
}

//Handle email verification process
export async function handleEmailVerfication(req: Request, res: Response) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(500).send("Invalid Token");
  }

  const payload = jwt.verify(token, secretKey) as { id: string };

  if (!payload) {
    return res.status(500).send("Invalid Token");
  }

  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!user) {
    return res.status(501).send("Invalid User");
  }

  const { id, ...userData } = user;

  await prisma.user.update({
    data: {
      ...userData,
      isVerified: true,
    },
    where: {
      id,
    },
  });

  await prisma.$disconnect();

  return res.status(200).send("User verified successfully!");
}

//Handle sending password reset email
export function handleSendPasswordResest(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(500).send("Invalid Email!");
  }

  sendEmail(
    email,
    "Reset Your Password!",
    `<div>
      <a href="http://your-app-link/password-reset">Press here in order to reset your password</a>
    </div>`,
    (err: Error, info) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send(`Email sent successfully: ${info.response}`);
    }
  );
}

//Handle password reset
export async function handlePasswordReset(req: Request, res: Response) {
  const { currentPassword, newPassword } = req.body;
  const { token } = req.cookies;

  if (!token) {
    return res.status(500).send("Invalid Token");
  }

  const payload = jwt.verify(token, secretKey) as { id: string };

  if (!payload) {
    return res.status(500).send("Invalid Token");
  }

  const prisma = new PrismaClient();
  let user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  const compareResult = bcrypt.compareSync(currentPassword, user.passwordHash);

  if (!compareResult) {
    return res.status(501).send("Invalid current password");
  }

  const newPasswordHash = bcrypt.hashSync(newPassword, 10);

  user.passwordHash = newPasswordHash;

  const { id, ...userData } = user;

  await prisma.user.update({
    data: {
      ...userData,
      isVerified: true,
    },
    where: {
      id,
    },
  });

  await prisma.$disconnect();

  return res.status(200).send("Password resetted successfully");
}

//Logout from the current user
export function handleLogout(_: Request, res: Response) {
  return res.status(200).clearCookie("token").send("Logged out successfully");
}

//Handle auth protected routes
export async function handleVerifyAuthorization(
  req: RequestWithUser,
  res: Response,
  nextFunction: NextFunction
) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send("Unauthorized!");
  }

  const payload = jwt.verify(token, secretKey) as { id: string };

  const prisma = new PrismaClient();
  const resultUser = await prisma.user.findFirst({
    where: {
      id: payload.id,
    },
  });

  if (!resultUser) {
    return res.status(401).send("Unauthorized!");
  }

  await prisma.$disconnect();

  req.user = resultUser;

  nextFunction();
}
//Handle get all users at once..
export async function handleGetAllUsers(_: RequestWithUser, res: Response) {
  const prisma = new PrismaClient();
  const resultUsers = await prisma.user.findMany();

  if (!resultUsers) {
    return res.status(500).send("Error while finding users");
  }

  await prisma.$disconnect();
  return res.status(200).json(resultUsers);
}
//Handle get a single user..
export async function handleGetUser(req: RequestWithUser, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(500).send("Empty argument");
  }

  const prisma = new PrismaClient();

  const resultUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(resultUser);
}
//Handle creating a user..
export async function handleCreateUser(req: RequestWithUser, res: Response) {
  const user: User = req.body;

  const hashedPassword = bcrypt.hashSync(user.passwordHash, 10);
  user.passwordHash = hashedPassword;

  const prisma = new PrismaClient();

  const resultUser = await prisma.user.create({ data: { ...user, isVerified: false } });

  await prisma.$disconnect();

  return res.status(200).json(resultUser);
}
//Handle updating a user..
export async function handleUpdateUser(req: RequestWithUser, res: Response) {
  const { id } = req.params;
  const data = req.body;

  if (!id || !data) {
    return res.status(500).send("Empty arguements");
  }

  const prisma = new PrismaClient();

  const resultUser = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  await prisma.$disconnect();

  return res.status(200).json(resultUser);
}

export async function handleDeleteUser(req: RequestWithUser, res: Response) {
  const { id } = req.params;

  const prisma = new PrismaClient();

  await prisma.user.delete({
    where: {
      id,
    },
  });

  await prisma.$disconnect();

  return res.status(200).send("User deleted successfully");
}

export async function handleGetCurrentUser(
  req: RequestWithUser,
  res: Response
) {
  const { user } = req;
  return res.status(200).json(user);
}

export async function handleUpdateCurrentUser(
  req: RequestWithUser,
  res: Response
) {
  const data = req.body;
  const prisma = new PrismaClient();

  const resultUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data,
  });

  await prisma.$disconnect();

  return res.status(200).json(resultUser);
}
