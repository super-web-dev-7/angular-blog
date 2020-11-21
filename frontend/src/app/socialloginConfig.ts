import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {environment} from '../environments/environment';

export function getAuthServiceConfigs() {
    return new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.client_id)
        },
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebook_app_id)
        }
    ]);
}
