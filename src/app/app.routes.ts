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
      { path: 'login', component: LoginComponent, title: 'Login Page' },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register Page',
      },
    ],
  },
  // blank route
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent, title: 'Home Page' },
      { path: 'cart', component: CartComponent, title: 'Cart Page' },
      {
        path: 'favorite',
        component: FavoriteComponent,
        title: 'Favorite Page',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products Page',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands Page' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories Page',
      },
      {
        path: 'details/:prodSlug/:prodId',
        component: DetailsComponent,
        title: 'Details Page',
        data: {
          renderMode: 'ssr',
        },
      },
      {
        path: 'checkout/:id',
        component: CheckoutComponent,
        title: 'Checkout Page',
      },
      {
        path: 'allorders',
        component: AllordersComponent,
        title: 'All orders Page',
      },
    ],
  },

  // not found route
  { path: '**', component: NotfoundComponent, title: 'Not Found Page' },
];
