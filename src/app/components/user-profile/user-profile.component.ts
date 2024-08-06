import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService , private router :Router) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Failed to load user profile', err)
    });
  }
  editProfile(): void {
    this.router.navigate(['/edit-profile']);
  }
}