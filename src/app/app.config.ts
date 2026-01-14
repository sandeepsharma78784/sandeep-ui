import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { authInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    // provideHttpClient(),               // provide HttpClient
    //  since we are using interceptors, we need to use withInterceptorsFromDi
    provideHttpClient(withInterceptors([authInterceptor])), // humn jo interceptor banaye he usko yaha provide krna hoga
    // provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    // provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(FormsModule,AuthModule.forRoot({
        domain: environment.auth0.domain,
        clientId: environment.auth0.clientId,
        useRefreshTokens: true,         // for getting refresh tokens wihtoout user interaction
        cacheLocation: 'localstorage', // on page refresh the access token is lost if we use default 'memory' option,also same for refresh_tokens
        authorizationParams: {
          redirect_uri: environment.auth0.redirectUri,
          audience: environment.auth0.audience,
          scope: 'openid profile email offline_access'
        }
      })),
      
    //importProvidersFrom(HttpClientModule),
    //importProvidersFrom(FormsModule),]  // import HttpClientModule]
  ]
};
