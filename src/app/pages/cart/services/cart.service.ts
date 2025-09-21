import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { CartDetails } from '../models/cart-details.interface';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cookieService = inject(CookieService);
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);

  myHeaders: object = {
    headers: {
      token: this.cookieService.get('token'),
    },
  };
  cartCounter!:number;

  addProductToCart(prodId: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'cart',
      {
        productId: prodId,
      },
      this.myHeaders
    );
  }
  getUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart', this.myHeaders);
  }
  deleteCartProduct(prodId: string): Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl + `cart/${prodId}`,
      this.myHeaders
    );
  }
  updateProductCount(prodId: string, count: number): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `cart/${prodId}`,
      { count: count },
      this.myHeaders
    );
  }
  checkoutCashSeasion(
    cartId: string | null,
    addressData: object
  ): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `orders/${cartId}`,
      addressData,
      this.myHeaders
    );
  }
  checkoutSeasion(cartId: string | null, addressData: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        `orders/checkout-session/${cartId}?url=http://localhost:4200`,
      addressData,
      this.myHeaders
    );
  }

  getUserOrders(): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + `orders/user/${this.authService.tokinId}`
    );
  }
}
