import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDto } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDto: LoginDto = { email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) { }

  login(): void {
    this.errorMessage = null;
    this.userService.login(this.loginDto).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']); 
      },
      error => {
        console.error('Error logging in:', error);
        this.handleErrors(error);
      }
    );
  }

  handleErrors(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'Invalid email or password.';
    } else {
      this.errorMessage = 'An unexpected error occurred.';
    }
  }
}
