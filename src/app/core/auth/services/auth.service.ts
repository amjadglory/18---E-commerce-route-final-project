import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { DecodeToken } from '../interrface/decode-token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }

  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }

  signout() {
    this.cookieService.delete('token');
    this.cookieService.delete('favProducts');
    this.router.navigate(['/login']);
  }

  tokinId!: string;
  decodeToken(): void {
    let dToken: DecodeToken;
    try {
      dToken = jwtDecode(this.cookieService.get('token'));
      console.log(dToken.id);
      this.tokinId = dToken.id;
    } catch (error) {
      this.signout();
    }
    return;
  }

  verifyEmail(email: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'auth/forgotPasswords',
      email
    );
  }
  verifyCode(code: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'auth/verifyResetCode',
      code
    );
  }
  resetPass(pass: object): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + 'auth/resetPassword',
      pass
    );
  }
}
