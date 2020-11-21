import { Router } from 'express';

import * as AuthController from '../controllers/auth.controller';

const router = Router();

//login Api
router.route('/login').post(AuthController.login);
router.route('/loginWithGoogle').post(AuthController.loginWithGoogle);
router.route('/loginWithFacebook').post(AuthController.loginWithFacebook);

//SignUp Api
router.route('/signup').post(AuthController.signup);
router.route('/signUpWithGoogle').post(AuthController.signUpWithGoogle);
router.route('/signUpWithFacebook').post(AuthController.signUpWithFacebook);

export default router;
