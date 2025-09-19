import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() inputLabel!: string;
  @Input() inputIcon!: string;
  @Input() inputControl!: any;
  @Input() inputType!: string;
  @Input() inputId!: string;
  @Input() inputPlaceHolder!: string;
  @Input() inputOrTextArea: string = 'input';

  showPass: boolean = true;
}
/*
<i class="fa-solid fa-lock-open"></i>
<i class="fa-solid fa-envelope"></i>
<i class="fa-solid fa-phone"></i>




<span
            (click)="showRePass = !showRePass"
            class="absolute top-1/5 end-3"
          >
            @if (showRePass) {
            <i class="fas fa-eye text-green-400 text-[14px]"></i>
            }@else {
            <i class="fas fa-eye-slash text-red-500 text-[14px]"></i>
            }
          </span>
*/
