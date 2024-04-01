import { IUserModel } from './../../types/common';
import passport, { DoneCallback, Profile } from "passport";
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import { appEnv } from "../../utils/env";
import AuthService from "../../services/auth.service";
import { Router } from "express";


const socialAuthRouter = Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: appEnv.GOOGLE_AUTH_CLIENT_ID!,
      clientSecret: appEnv.GOOGLE_AUTH_SECRET_ID!,
      callbackURL: `${appEnv.APP_URL}/auth/redirect/google`,
      state: false,
    },
    (_accessToken, _refreshToken, profile, done) => AuthService.authenticateWithGoogle(profile, done),
  ),
);
passport.serializeUser((user, cb) => {
  cb(null, user)
});
socialAuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
socialAuthRouter.get('/redirect/google', passport.authenticate('google'), async (req, res, next) => {
  try {
    const user = req.user as IUserModel;
    const result = await AuthService.LoginWithGoogle(user.email);
    const url = `${appEnv.FRONTEND_URL}/auth/redirect?token=${result.token}`;
    return res.redirect(url);
  } catch (error) {
    return next(error);
  }
});

export default socialAuthRouter;