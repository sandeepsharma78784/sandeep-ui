import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, from, switchMap, throwError } from 'rxjs';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return from(auth.getAccessTokenSilently()).pipe(
    switchMap(token => {
      console.log('✅ Retrieved token:', token);
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    }),
    //  humne yaha error handling add kiya hai taaki agar token na mile to bhi request chali jaye bina token ke
    // abhi kya ho rha the ki request hi nahi jaa rahi thi and humne pta hi nahi chl raha the ki kya ho raha he
    // so interceptor me hi humne catchError lagaya taaki agar token na mile to bhi request jaa jaye bina token ke 
    // pr ab hum is catch error k use force login k liye kr rahe he.
     catchError(err => {
      console.error('❌ Token error:', err.message);
      // fallback → send request WITHOUT token
      // return next(req);
      alert(err.error);
      if (err.error === 'login_required' || err.error === 'consent_required' || 
        err.error === 'missing_refresh_token' || err.error === 'invalid_grant') {
        
      // Prompt user to log in again interactively
      //  invalid_grant wala error tab aata hai jab refresh token expire ho jata hai and ye bahut hi rare case hai
      auth.loginWithRedirect();
      // agar sesion expire ho gyi hai to user ko login page pe bhej do
      // agar session live he to consent wala page dikhega. or ye bs  invalid_grant case me hi aayega
      // missing_refresh_token case me bhi yehi hoga
    }
      // return next(req);
       return throwError(() => err);
    })
  );
};


// below is old code before anglular 15 functional interceptor style
// import { inject, Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
// import { AuthService } from '@auth0/auth0-angular';
// import { from } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private auth: AuthService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     return from(this.auth.getAccessTokenSilently()).pipe(
//       switchMap(token => {
//         const authReq = req.clone({
//           setHeaders: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         return next.handle(authReq);
//       })
//     );
//   }
// }
