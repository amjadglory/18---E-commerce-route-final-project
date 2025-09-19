import { AuthService } from './../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  // services
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // properties
  isLoading: boolean = false;
  resmail: string = '';
  errMsg: string = '';
  sucMsg: string = '';
  subscription: Subscription = new Subscription();

  // code
  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),
  //     rePassword: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^01[0125][0-9]{8}$/),
  //     ]),
  //   },
  //   { validators: [this.confirmPassword] }
  // );
  registerForm!: FormGroup;

  initFrom(): void {
    this.registerForm = this.fb.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
        rePassword: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
      },
      { validators: [this.confirmPassword] }
    );
  }

  ngOnInit(): void {
    this.initFrom();
  }

  submit(): void {
    if (this.registerForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;
      this.subscription = this.authService
        .sendRegisterForm(this.registerForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            console.log(this.registerForm.value);
            if (res.message === 'success') {
              this.errMsg = '';
              this.sucMsg = res.message;
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1000);
              this.isLoading = false;
            }
            console.log(res);
            this.resmail = res.user.email;
          },
          error: (err) => {
            console.log(err);
            {
              this.errMsg = err.error.message;
              this.isLoading = false;
            }
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
      this.registerForm.get('rePassword')?.patchValue('');
    }
  }

  confirmPassword(group: AbstractControl) {
    // return group.get('rePassword')?.value === group.get('password')?.value
    //   ? null
    //   : { missMatch: true };
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ missMatch: true });
      return { missMatch: true };
    }
  }
}
