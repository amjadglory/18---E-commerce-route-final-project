import { ProductsComponent } from './../products/products.component';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/models/product.interface';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';
import { PopularProductsComponent } from './components/popular-products/popular-products.component';
import { BrandsComponent } from '../brands/brands.component';

@Component({
  selector: 'app-home',
  imports: [
    MainSliderComponent,
    PopularCategoriesComponent,
    PopularProductsComponent,
    BrandsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  productList: Product[] = [];

  getAllProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
      error: (err) => {},
    });
  }
  ngOnInit(): void {
    this.getAllProductsData();
  }
}
