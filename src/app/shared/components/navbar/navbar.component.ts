import { FlowbiteService } from './../../../core/services/flowbite.service';
import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private FlowbiteService: FlowbiteService) {}
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  @Input({ required: true }) isLogin!: boolean;

  signout(): void {
    this.authService.signout();
  }
}
