import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Users } from "../Models/Users";
import { sendForgotPasswordMail } from "../config/emailservice";

interface decoded {
  id: string;
  email: string;
  exp?: number;
  iat?: number;
}

export const Login = async (req: any, res: Response) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (user == null) {
    return res.status(400).send({
      message: "User not found",
    });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).send({
      message: "Invalid password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1day",
    }
  );
  res.send({
    token,
    message: "User logged in successfully",
  });
};

export const Register = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password, username, gender, dateOfBirth } = req.body;
  const user = await Users.create({
    email,
    password,
    username,
    gender,
    dateOfBirth,
  });
  console.log("Registering user with email:", email);
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "10minutes",
    }
  );
  res.send({
    email: user.email,
    token: token,
    password: user.password,
    message: "User registered successfully",
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30minutes",
    }
  );
  const frontendUrl = `https://localhost:5000/auth/reset-password?token=${token}`;
  // const frontendUrl = `https://localhost:5000/auth/reset-password?token=${encodeURIComponent(token)}`

  await sendForgotPasswordMail(user.email, user.username, frontendUrl);

  return res.status(200).json({
    message:
      "Email sent successfully, Check you email for further instructions",
  });
};

export const setPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as decoded;

  if (!decoded) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }

  const user = await Users.findOne({ _id: decoded.id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.password = password;
  await user.save();
  return res.status(200).json({
    message: "password set",
  });
};

// export const forgotPassword = async (req: Request, res: Response) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!process.env.CRYPTO_SECRET) return false;
//     const token = CryptoJS.AES.encrypt(
//       email,
//       process.env.CRYPTO_SECRET
//     ).toString();

//     const resetLink = `${
//       process.env.FRONTEND_URL
//     }/auth/set-password/${encodeURIComponent(token)}`;

//     const emailHTML = forgotPasswordEmailTemplate(email, resetLink);
//     await sendEmail(email, "Password Reset Request", emailHTML);

//     return res
//       .status(200)
//       .json({ message: "Password reset email sent successfully." });
//   } catch (error) {
//     console.error("Error in forgotPassword:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

// export const resetPassword = async (req: Request, res: Response) => {
//   const { token, newPassword } = req.body;

//   if (!token) return res.status(400).json({ message: "Token is required." });

//   try {
//     if (!process.env.CRYPTO_SECRET) return false;
//     const bytes = CryptoJS.AES.decrypt(
//       decodeURIComponent(token),
//       process.env.CRYPTO_SECRET
//     );
//     const email = bytes.toString(CryptoJS.enc.Utf8);

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found." });

//     user.password = newPassword;
//     await user.save();

//     return res
//       .status(200)
//       .json({ message: "Password has been reset successfully." });
//   } catch (error) {
//     console.error("Error in resetPassword:", error);
//     return res.status(400).json({ message: "Invalid or expired token." });
//   }
// };
