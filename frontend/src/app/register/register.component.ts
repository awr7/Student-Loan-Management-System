import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor() {
    this.registerForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });

    this.registerForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.errorMessage = null;
      }
    });
  }
  
  onSubmit() {
    console.log('Register form submitted:', this.registerForm.value);
  }
}
