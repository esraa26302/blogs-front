import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  displayedPosts: Post[] = [];
  isAdminOrWriter: boolean = false;
  itemsPerPage: number = 9; 
  currentPage: number = 0;

  constructor(private postService: PostService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
     
      this.posts = posts.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
      this.loadMorePosts(); 
    });

    this.isAdminOrWriter = this.authService.isUserRole(['Admin', 'writer']);
  }

  addPost(): void {
    this.router.navigate(['/add-post']);
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
