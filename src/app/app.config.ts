import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideHttpClient(),               // provide HttpClient
    importProvidersFrom(FormsModule,AuthModule.forRoot({
        domain: environment.auth0.domain,
        clientId: environment.auth0.clientId,
        authorizationParams: {
          redirect_uri: environment.auth0.redirectUri,
          audience: environment.auth0.audience,
          scope: 'openid profile email'
        }
      }))
    //importProvidersFrom(HttpClientModule),
    //importProvidersFrom(FormsModule),]  // import HttpClientModule]
  ]
};
