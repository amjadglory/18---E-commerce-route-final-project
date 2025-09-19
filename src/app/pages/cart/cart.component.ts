import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { CartDetails } from './models/cart-details.interface';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails: CartDetails = {} as CartDetails;
  isLoading: boolean = false;

  getUserCartProds() {
    this.isLoading = true;
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.cartDetails = res.data;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
  deleteUserCartProduct(prodId: string) {
    this.cartService.deleteCartProduct(prodId).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateUserCartProdCount(prodId: string, count: number) {
    return this.cartService.updateProductCount(prodId, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getUserCartProds();
  }
}
