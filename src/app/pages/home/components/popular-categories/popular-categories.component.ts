import { Category } from '../../../../core/models/category.interface';
import { CategoriesService } from './../../../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };

  private readonly categoriesService = inject(CategoriesService);

  categoryList: Category[] = [];
  isLoading: boolean = false;

  getAllCategoriesData() {
    this.isLoading = true;
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  ngOnInit(): void {
    this.getAllCategoriesData();
  }
}
