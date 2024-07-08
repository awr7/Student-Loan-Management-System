import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('')
    });

    this.loginForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.errorMessage = null;
      }
    });
  }


  async onSubmit() {
    try {
      if (this.loginForm.valid) {
        this.errorMessage = null;
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
        if (response.status === 401) {
          const errorMessage = await response.json();
          this.errorMessage = errorMessage;
          console.error('Login failed:', errorMessage);
        } else if (response.ok) {
          const data = await response.json();
          localStorage.setItem('jwt', data.token);
          console.log('Login successful:', data);
          this.router.navigate(['/']);
        }
      }
    } catch (error) {
      console.error('Error in onSubmit', error);
    }
  }  
}