import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  myHeaders: object = {
    headers: {
      token: this.cookieService.get('token'),
    },
  };
  favProds: Array<Product> = [];
  AddFavProd(prodId: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'wishlist',
      {
        productId: prodId,
      },
      this.myHeaders
    );
  }
  removeFavProd(prodId: string): Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl + `wishlist/${prodId}`,
      this.myHeaders
    );
  }
  getFavProds(): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + 'wishlist',
      this.myHeaders
    );
  }
}
