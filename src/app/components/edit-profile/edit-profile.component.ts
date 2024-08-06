import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  user!: User;
  error!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['']
    });
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.userService.getUser(userId).subscribe(
      (user) => {
        this.user = user;
        this.editProfileForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          image: this.user.image
        });
      },
      (error) => {
        console.error('Error fetching user:', error);
        this.error = 'An error occurred while fetching the user data. Please try again later.';
      }
    );
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const updatedUser = { ...this.user, ...this.editProfileForm.value };
      this.userService.updateUser(this.user.id!, updatedUser).subscribe(
        () => {
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Error updating profile:', error);
          this.error = 'An error occurred while updating the profile. Please try again later.';
        }
      );
    }
  }


 
  
  
}