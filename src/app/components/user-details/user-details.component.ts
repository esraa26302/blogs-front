import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent  implements OnInit{
  user!: User;
  error?: string;
  showDeletePopup: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser(+userId).subscribe(
        user => this.user = user,
        error => {
          console.error('Error fetching user:', error);
          this.error = 'An error occurred while fetching user data.';
        }
      );
    }
  }

  handleDeletePopupClose() {
    this.showDeletePopup = false;
  }

  handleUserDelete() {
    if (this.user.id) {
      this.userService.deleteUser(this.user.id).subscribe(
        () => this.router.navigate(['/users']),
        error => {
          console.error('Error deleting user:', error);
          this.error = 'An error occurred while deleting the user.';
        }
      );
    }
    this.handleDeletePopupClose();
  }}