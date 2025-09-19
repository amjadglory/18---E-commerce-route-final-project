import { Product } from './../../core/models/product.interface';
import { Component, inject } from '@angular/core';
import { FavoriteService } from '../../shared/components/favorite.service';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-favorite',
  imports: [CardComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
})
export class FavoriteComponent {
  private readonly favoriteService = inject(FavoriteService);
  productList: Product[] = [];
  currentUserFav: Array<string> = [];
  isLoading: boolean = false;
  isFav: boolean = false;
  getUserFavProds() {
    this.isLoading = true;
    this.favoriteService.getFavProds().subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.productList = res.data;
        for (let i = 0; i < res.data.length; i++) {
          this.currentUserFav.push(res.data[i].id);
        }

        console.log(this.productList);
        console.log(this.currentUserFav);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  removeProdFromFav(
    prodId: string,
    favBtnRef: HTMLButtonElement,
    removeFavBtnRef: HTMLButtonElement
  ) {
    this.favoriteService.removeFavProd(prodId).subscribe({
      next: (res) => {
        console.log(res);
        this.currentUserFav = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.getUserFavProds();
  }
}
