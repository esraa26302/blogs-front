import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  post: Post = { 
    content: '',
    image: '',
    userId: 0 ,
    userName : '' ,
    userImage : '' ,
    creationDate :''

  };
  errorMessage: string | null = null;

  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService
  ) {
   
  }

  onSubmit(): void {
    this.postService.createPost(this.post).subscribe(
      () => this.router.navigate(['/posts']),
      error => this.errorMessage = 'Failed to add post. Please try again.'
    );
  }
}
