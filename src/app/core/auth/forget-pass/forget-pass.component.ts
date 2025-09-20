import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  imports: [FormsModule, ReactiveFormsModule, InputComponent],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.css',
})
export class ForgetPassComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPass!: FormGroup;
  isLoading: boolean = false;
  step: number = 1;

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.verifyCode = this.fb.group({
      resetCode: [null, Validators.required],
    });
    this.resetPass = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [
        null,
        [Validators.required, Validators.pattern(/^\w{6,}$/)],
      ],
    });
  }

  step1(): void {
    if (this.verifyEmail.valid) {
      this.isLoading = true;
      this.authService.verifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 2;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
  step2(): void {
    if (this.verifyCode.valid) {
      this.isLoading = true;
      this.authService.verifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 3;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
  step3(): void {
    if (this.resetPass.valid) {
      this.isLoading = true;
      this.authService.resetPass(this.resetPass.value).subscribe({
        next: (res) => {
          console.log(res);
          this.cookieService.set('token', res.token);
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        },
      });
    }
  }
}
