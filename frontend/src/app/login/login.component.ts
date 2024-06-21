import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('')
    });
  }

  async onSubmit() {
    try {
      if (this.loginForm.valid) {
        const formData = new URLSearchParams();
        formData.append('username', this.loginForm.get('username')?.value);
        formData.append('password', this.loginForm.get('password')?.value);
  
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString(),
          credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error('Error in onSubmit', error);
    }
  }  
}