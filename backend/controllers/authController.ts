// src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import { authService } from "../services/authService";
import passport from "passport";
import { User, PrismaClient } from "@prisma/client"; // Import User type from Prisma
import { encrypt } from "../utils/crypto";
import crypto from "crypto";

const prisma = new PrismaClient();

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const user = await authService.signup(email, password, name);
      res.status(201).json({ message: "User created", user });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await authService.login(
        email,
        password
      );
      res.json({ accessToken, refreshToken, user });
    } catch (error) {
      next(error);
    }
  }

  googleAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }

  googleCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "google",
      { session: false },
      async (err: Error | null, user: User | false | null) => {
        if (err || !user) return next(err || new Error("Google auth failed"));

        let { accessToken, refreshToken } = await authService.generateTokens(
          user
        );
        accessToken = encrypt(accessToken);
        refreshToken = encrypt(refreshToken);
        await prisma.user.update({
          where: { id: user.id },
          data: {
            refreshToken,
            lastLogin: new Date(),
          },
        });

        res.redirect(
          `/auth/success?accessToken=${accessToken}&refreshToken=${refreshToken}`
        );
      }
    )(req, res, next);
  }

  githubAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
  }

  githubCallback(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "github",
      { session: false },
      async (
        err: Error | null,
        user: User | false | null,
        info: { accessToken?: string; refreshToken?: string }
      ) => {
        if (err || !user) return next(err || new Error("GitHub auth failed"));

        const githubAccessToken = info?.accessToken;
        const githubRefreshToken = info?.refreshToken;

        const encryptedAccessToken = githubAccessToken
          ? encrypt(githubAccessToken)
          : null;
        const encryptedRefreshToken = githubRefreshToken
          ? encrypt(githubRefreshToken)
          : null;

        await prisma.user.update({
          where: { id: user.id },
          data: {
            gitHubAccessToken: encryptedAccessToken,
            gitHubRefreshToken: encryptedRefreshToken,
          },
        });

        const { accessToken, refreshToken } = await authService.generateTokens(
          user
        );
        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken },
        });

        res.redirect(
          `http://localhost:3000/auth/success?accessToken=${accessToken}&refreshToken=${refreshToken}`
        );
      }
    )(req, res, next);
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // From authMiddleware
      await authService.logout(userId);
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshToken(refreshToken);
      res.json(tokens);
    } catch (error) {
      next(error);
    }
  }

  sendEmailVerification = async (req: Request, res: Response) => {
    const userId = req.user?.id; // depends on your auth middleware

    try {
      await authService.sendVerificationEmail(userId);
      res.status(200).json({ message: "Verification email sent" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not send verification email" });
    }
  };

  verifyEmail = async (req: Request, res: Response) => {
    const token = req.params.token;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: hashedToken,
        verificationTokenExpiry: { gte: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Token is invalid or has expired" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });

    // redirect to frontend dashboard
    res.redirect("https://hackmate-frontend.com/dashboard"); // replace later
  };
}

export const authController = new AuthController();
