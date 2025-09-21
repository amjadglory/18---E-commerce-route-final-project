import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../pages/cart/services/cart.service';
import { ToasterComponent } from '../toaster/toaster.component';
import { CookieService } from 'ngx-cookie-service';
import { json } from 'node:stream/consumers';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink, ToasterComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input({ required: true }) product: Product = {} as Product;
  isLayerHidden: boolean = false;
  private readonly cartService = inject(CartService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly cookieService = inject(CookieService);
  isLoading: boolean = false;
  currentUserFav: Array<string> = [];

  addProductToCart(prodId: string): void {
    this.cartService.addProductToCart(prodId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartCounter = res.numOfCartItems;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToFav(
    prodId: string,
    favBtnRef: HTMLButtonElement,
    removeFavBtnRef: HTMLButtonElement
  ) {
    this.isLoading = true;
    this.favoriteService.AddFavProd(prodId).subscribe({
      next: (res) => {
        favBtnRef.classList.add('hidden');
        removeFavBtnRef.classList.remove('hidden');
        console.log(res);
        this.isLoading = false;
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
    this.isLoading = true;
    this.favoriteService.removeFavProd(prodId).subscribe({
      next: (res) => {
        favBtnRef.classList.remove('hidden');
        removeFavBtnRef.classList.add('hidden');

        console.log(res.data);
        this.currentUserFav = [];
        this.isLoading = false;
        for (let i = 0; i < res.data.length; i++) {
          this.currentUserFav.push(res.data[i]);
          console.log(this.currentUserFav);
        }
        console.log(this.currentUserFav);

        this.cookieService.set('curntFavProds', this.currentUserFav.toString());
        this.getUserFavProds();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  getUserFavProds() {
    this.favoriteService.getFavProds().subscribe({
      next: (res) => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          this.currentUserFav.push(res.data[i].id);
        }
        this.favoriteService.favProds = res.data;
        console.log(this.currentUserFav);
        this.cookieService.set('curntFavProds', this.currentUserFav.toString());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showToaster(toasterRef: HTMLDivElement) {
    toasterRef.classList.add('toastAnime');
    setTimeout(() => {
      toasterRef.classList.remove('toastAnime');
    }, 500);
  }

  hideDetailsX(detailsRef: HTMLDivElement) {
    detailsRef.classList.remove('flex');
    detailsRef.classList.add('hidden');
    this.isLayerHidden = true;
  }
  stopPop(event: Event) {
    event.stopPropagation();
  }
  showDetails(detailsRef: HTMLDivElement) {
    detailsRef.classList.add('flex');
    detailsRef.classList.remove('hidden');
    this.isLayerHidden = false;
  }

  ngOnInit(): void {
    this.getUserFavProds();
  }
}
