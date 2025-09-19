import { Product } from './../../core/models/product.interface';
import { Component, inject } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../core/services/products/products.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../cart/models/cart-details.interface';

@Component({
  selector: 'app-categories',
  imports: [CardComponent, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private readonly productsService = inject(ProductsService);

  productList: Product[] = [];
  isLoading: boolean = false;
  categoryProp: string = '';

  getAllProductsData(): void {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.productList = [];
        for (const product of res.data) {
          if (product.category._id === this.categoryProp) {
            this.productList.push(product);
          }
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.getAllProductsData();
  }
}
