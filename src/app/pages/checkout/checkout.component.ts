import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  checkoutForm!: FormGroup;
  cartId!: string | null;
  payMethod!: string;
  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }
  initForm(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        city: [null, [Validators.required]],
      }),
    });
  }
  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.cartId = urlParams.get('id');
        console.log(this.cartId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  cashCheckout(): void {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
      console.log(this.cartId);
      this.cartService
        .checkoutCashSeasion(this.cartId, this.checkoutForm.value)
        .subscribe({
          next: (res) => {
            if (res.status === 'success') {
              window.open('#/home', '_self');
              console.log(res);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
  checkout(): void {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
      console.log(this.cartId);
      this.cartService
        .checkoutSeasion(this.cartId, this.checkoutForm.value)
        .subscribe({
          next: (res) => {
            if (res.status === 'success') {
              window.open('#/home', '_self');
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
