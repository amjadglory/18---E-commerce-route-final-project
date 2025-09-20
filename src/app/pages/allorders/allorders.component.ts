import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { DecodeToken } from '../../core/auth/interrface/decode-token.interface';
import { environment } from '../../../environments/environment.development';
import { CartService } from '../cart/services/cart.service';
import { Order } from './interface/order.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);

  ordersList: Order[] = [];
  isLoading: boolean = false;

  getUserOrders(): void {
    this.isLoading = true;
    this.cartService.getUserOrders().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.ordersList = res.reverse();
        console.log(res);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.authService.decodeToken();
    this.getUserOrders();
  }
}
