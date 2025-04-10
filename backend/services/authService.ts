// src/services/authService.ts
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { authConfig } from "../config/auth";
import moment from "moment-timezone";
import { transporter } from "../utils/nodemailer";
import { addMinutes } from "date-fns";
import crypto from "crypto";

const prisma = new PrismaClient();

export class AuthService {
  async signup(
    email: string,
    password: string | null,
    name: string
  ) {
    // If password exists, hash it (for normal signup)
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Auto-detect time zone if not provided

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        isEmailVerified: false,
        status: "active",
        lastLogin: new Date(),
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new Error("Invalid credentials");
    }
    return this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const payload: { id: string } = { id: user.id };
    const secret: Secret = authConfig.jwt.secret;
    const accessOptions: SignOptions = { expiresIn: authConfig.jwt.expiresIn };
    const refreshOptions: SignOptions = {
      expiresIn: authConfig.jwt.refreshExpiresIn,
    };

    const accessToken = jwt.sign(payload, secret, accessOptions);
    const refreshToken = jwt.sign(payload, secret, refreshOptions);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken, lastLogin: new Date() },
    });

    return { accessToken, refreshToken };
  }

  async logout(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async refreshToken(refreshToken: string) {
    const decoded = jwt.verify(refreshToken, authConfig.jwt.secret) as {
      id: string;
    };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || user.refreshToken !== refreshToken)
      throw new Error("Invalid refresh token");

    return this.generateTokens(user);
  }

  sendVerificationEmail = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.isEmailVerified)
      throw new Error("User not found or already verified");

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await prisma.user.update({
      where: { id: userId },
      data: {
        verificationToken: hashedToken,
        verificationTokenExpiry: addMinutes(new Date(), 15),
      },
    });

    const verifyUrl = `https://hackmate-frontend.com/auth/verify-email/${token}`; // Dummy link

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Verify your HackMate Email",
      html: `<p>Click the link to verify your email:</p>
           <a href="${verifyUrl}">${verifyUrl}</a>
           <p>This link expires in 15 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
  };
}

export const authService = new AuthService();
