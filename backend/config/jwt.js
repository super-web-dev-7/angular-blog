import expressJwt from 'express-jwt';
import config from './config';

const jwt = () => {
    return expressJwt({secret: config.jwtSecret}).unless({
        path: [
            // public routes that don't require authentication
            '/api/auth/login',
            '/api/auth/loginWithGoogle',
            '/api/auth/loginWithFacebook',
            '/api/auth/signup',
            '/api/auth/signUpWithGoogle',
            '/api/auth/signUpWithFacebook',
            '/api/question/addQuestion',
            '/api/question/getQuestion/:id',
            '/api/question/getQuestion',
            {url: '/api/users', methods: ['POST']},
            '/api/test',
            '/api/users/verify',
        ]
    });
};

export default jwt;
