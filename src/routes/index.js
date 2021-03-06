import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import verifyEmail from '../controllers/verify-controller';

import api from './api/index.route';
import oauth from './api/oauth/oauth.routes';
import error from '../middlewares/error.middleware';
import notfound from '../middlewares/404.middleware';
import { mock } from '../middlewares/validators/socialLogin-mock';

dotenv.config();

const router = express.Router();
router.use(cors());
router.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    cookie: {
      maxAge: 3600000
    },
    saveUninitialized: true
  })
);
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  router.use(mock);
}
router.use(passport.initialize());
const apiVersion = process.env.API_VERSION;

const baseUrl = `/api/${apiVersion}`;
router.put('/verifyemail', verifyEmail);
router.get('/', (req, res) => res.status(200).json({ status: 200, data: 'Welcome to Authors Haven.' }));
router.use(baseUrl, api);
router.use(oauth);

router.use(notfound);
router.use(error);

export default router;
