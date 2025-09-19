import { ProductDetailsService } from './services/product-details.service';
import { Product } from './../../core/models/product.interface';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],

  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);

  prodId: string | null = null;
  prodDetails: Product = {} as Product;
  isLoading: boolean = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    items: 1,
    autoWidth: true,
    margin: 50,
  };
  benifits: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
    slideTransition: 'linear',
    smartSpeed: 1500,
  };

  addProductToCart(prodId: string) {
    this.cartService.addProductToCart(prodId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getProdId();
    this.getProdDetailsData();
  }

  getProdId(): void {
    this.isLoading = true;

    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.isLoading = false;
        this.prodId = urlParams.get('prodId');
      },
    });
  }

  getProdDetailsData(): void {
    this.isLoading = true;
    this.productDetailsService.getProductDetails(this.prodId).subscribe({
      next: (res) => {
        this.prodDetails = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
}
