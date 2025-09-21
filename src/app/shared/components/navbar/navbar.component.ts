import { FlowbiteService } from './../../../core/services/flowbite.service';
import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../pages/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private FlowbiteService: FlowbiteService) {}
  private readonly authService = inject(AuthService);
  public readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCounter = res.numOfCartItems;
      },
    });
  }
  @Input({ required: true }) isLogin!: boolean;

  signout(): void {
    this.authService.signout();
  }
}
