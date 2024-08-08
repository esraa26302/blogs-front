import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  posts: Post[] = [];
  displayedPosts: Post[] = [];
  isAdminOrWriter: boolean = false;
  itemsPerPage: number = 9; 
  currentPage: number = 0;

  constructor(private postService: PostService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
     
      this.posts = posts.reverse(); 
      this.loadMorePosts(); 
    });

    this.isAdminOrWriter = this.authService.isUserRole(['Admin', 'writer']);
  }

  viewPost(): void {
    this.router.navigate(['/posts']);
  }

  loadMorePosts(): void {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const newPosts = this.posts.slice(startIndex, endIndex);
    this.displayedPosts = [...this.displayedPosts, ...newPosts];
    this.currentPage++;
  }

  get hasMorePosts(): boolean {
    return this.displayedPosts.length < this.posts.length;
  }
}
