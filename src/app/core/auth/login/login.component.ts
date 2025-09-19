import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // services
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  // properties
  isLoading: boolean = false;
  resmail: string = '';
  errMsg: string = '';
  sucMsg: string = '';
  showPass: boolean = true;
  subscription: Subscription = new Subscription();

  // code
  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [
  //     Validators.required,
  //     Validators.pattern(/^\w{6,}$/),
  //   ]),
  // });
  loginForm!: FormGroup;

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  submit(): void {
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;
      this.subscription = this.authService
        .sendLoginForm(this.loginForm.value)
        .subscribe({
          next: (res) => {
            // console.log(res);
            // console.log(this.loginForm.value);

            this.cookieService.set('token', res.token);

            if (res.message === 'success') {
              this.errMsg = '';
              this.sucMsg = res.message;
              this.authService.decodeToken();
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 1000);
              this.isLoading = false;
            }
            console.log(res);
            this.resmail = res.user.email;
          },
          error: (err) => {
            // console.log(err);

            this.errMsg = err.error.message;
            this.isLoading = false;
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
