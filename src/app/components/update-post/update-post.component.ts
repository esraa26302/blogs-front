import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})
export class UpdatePostComponent implements OnInit {
  post: any = {};
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = +params.get('id')!;
      this.getPost(postId);
      console.log("g",this.authService.getUserId())
    });
  }

  getPost(id: number): void {
    this.postService.getPostById(id).subscribe(
      post => {
        this.post = post;
       
        if (this.authService.getUserId() !== post.userId && !this.authService.isUserRole(['Admin'])) {
          this.router.navigate(['/unauthorized']);
        }
      },
      error => {
        this.errorMessage = 'Error fetching post data';
      }
      
    );
  }

  onSubmit(): void {
    if (this.post.content && this.post.image) {
      this.postService.updatePost(this.post.id,this.post).subscribe(
        () => this.router.navigate(['/posts']),
        error => this.errorMessage = 'Error updating post'
      );
    } else {
      this.errorMessage = 'Please fill in all required fields';
    }
  }
}