import { ProductsService } from './../../../../core/services/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { Product } from '../../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../../../shared/components/favorite.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent, RouterLink],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  productList: Product[] = [];
  isLoading: boolean = false;

  getAllProductsData(): void {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.productList = res.data;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  ngOnInit(): void {
    this.getAllProductsData();
  }
}
