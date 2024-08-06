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

  constructor(private userService: UserService, private router: Router) {}

  onLogin(): void {
    this.userService.signin(this.email, this.password).subscribe({
      next: (response: any) => {
        // Check if the response contains user data or a success indicator
        if (response && response.user) {
          console.log('Login successful', response);
          // Store the token or handle authentication state
          this.router.navigate(['/dashboard']);
        } else {
          // If no user data is returned, set the error message
          this.errorMessage = response.message || 'Invalid email or password';
        }
      },
      error: (error) => {
        console.error('Login error', error);
        this.errorMessage = 'An error occurred while logging in';
      }
    });
  }
}
