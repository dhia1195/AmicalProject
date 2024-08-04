import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: UserService, private router: Router) {}

  onLogin(): void {
    const loginData = { email: this.email, password: this.password };
    this.authService.signToken(loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        // Store the token or handle authentication state
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login error', error);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
