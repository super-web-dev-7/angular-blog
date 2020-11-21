import {environment} from '../../environments/environment';

const baseUrl = environment.baseUrl;
const apiUrl = environment.apiUrl;

export const UrlJSON = {
    loginUrl: apiUrl + 'auth/login',
    loginWithGoogleUrl: apiUrl + 'auth/loginWithGoogle',
    loginWithFacebook: apiUrl + 'auth/loginWithFacebook',
    signupUrl: apiUrl + 'auth/signup',
    signUpWithGoogleUrl: apiUrl + 'auth/signUpWithGoogle',
    signUpWithFacebookUrl: apiUrl + 'auth/signUpWithFacebook',

    userUrl: apiUrl + 'user',
    QuestionUrl: apiUrl + 'question',
    CategoryUrl: apiUrl + 'category',
};
