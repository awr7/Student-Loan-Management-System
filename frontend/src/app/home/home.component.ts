import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {
  }

  async startNow() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No token found');
      this.router.navigate(['/login']);
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/v1/registration/start', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        console.log(`User email: ${data.userId}`);
        this.router.navigate(['/dashboard']);
      } else {
        console.error('Failed to start:', response.statusText);
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error in startNow', error);
      this.router.navigate(['/login']);
    }
  }
}
