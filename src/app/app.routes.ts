import { ForgetPassComponent } from './core/auth/forget-pass/forget-pass.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DetailsComponent } from './pages/details/details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedInGuard } from './core/guards/is-logged-in-guard';
import { AllordersComponent } from './pages/allorders/allorders.component';

export const routes: Routes = [
  // empty route
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // auth route
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedInGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'Login Page',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register Page',
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./core/auth/forget-pass/forget-pass.component').then(
            (c) => c.ForgetPassComponent
          ),
        title: 'Forget Password',
      },
    ],
  },
  // blank route
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
        title: 'BoycottMarket',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart Page',
      },
      {
        path: 'favorite',
        loadComponent: () =>
          import('./pages/favorite/favorite.component').then(
            (c) => c.FavoriteComponent
          ),
        title: 'Favorite Page',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'Products Page',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'Brands Page',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'Categories Page',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
        title: 'Checkout Page',
      },
      {
        path: 'details/:prodSlug/:prodId',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'Details Page',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
        title: 'All orders Page',
      },
    ],
  },

  // not found route
  {
    path: '**',
    loadComponent: () =>
      import('./pages/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
    title: 'Not Found Page',
  },
];
