import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brand } from '../../core/models/brand.interface';

@Component({
  selector: 'app-brands',
  imports: [CarouselModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  customOptions: OwlOptions = {
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

  private readonly brandsService = inject(BrandsService);

  brandsList: Brand[] = [];
  isLoading: boolean = false;

  getAllCategoriesData() {
    this.isLoading = true;
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
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
