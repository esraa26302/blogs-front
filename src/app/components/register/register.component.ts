import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user : User = {
    name: '',
    email: '',
    password: '',
    role: '',
    image: ''
  };

  errorMessages: string[] = [];

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.errorMessages = [];
    this.userService.register(this.user).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error registering user:', error);
        this.handleErrors(error);
      }
    );
  }

  handleErrors(error: any) {
    if (error.status === 400 && error.error.errors) {
      for (const key in error.error.errors) {
        if (error.error.errors.hasOwnProperty(key)) {
          this.errorMessages.push(error.error.errors[key]);
        }
      }
    } else if (error.status === 409) { 
      this.errorMessages.push('The email is already registered.');
    } else {
      this.errorMessages.push('An unexpected error occurred.');
    }
  }
}