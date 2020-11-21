// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // baseUrl: 'http://localhost:4000/',
    // apiUrl: 'http://localhost:4000/api/',
    baseUrl: 'http://192.168.1.7:4000/',
    apiUrl: 'http://192.168.1.7:4000/api/',

    client_id: '882184212311-3s60q8nrpsd4rkjnqnqr8ad6lohbndin.apps.googleusercontent.com',
    project_id: 'question-and-answer-275801',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: 'vuOTbPGM2w8BPcE1xYJBXUnd',
    redirect_uris: [
        'http://localhost:4200/auth/google/callback'
    ],
    javascript_origins: [
        'http://localhost:4200',
    ],

    facebook_app_id: '1326872314367285'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
