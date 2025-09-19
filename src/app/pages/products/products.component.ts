import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  productList: Product[] = [];
  pageSize!: number;
  p!: number;
  total!: number;
  isLoading: boolean = false;
  searchInput: string = '';

  getAllProductsData(pageNum: number = 1): void {
    this.isLoading = true;
    this.productsService.getAllProducts(pageNum).subscribe({
      next: (res) => {
        this.productList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  categoryProp: string = '';
  brandProp: string = '';

  getProductsByCategory(): void {
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

  getProductsByCategory_Brand(): void {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.productList = [];
        for (const product of res.data) {
          if (
            product.category._id === this.categoryProp &&
            product.brand._id === this.brandProp
          ) {
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
