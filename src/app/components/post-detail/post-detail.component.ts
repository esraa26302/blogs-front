import { Component, OnInit } from '@angular/core';
import { CommentCreateDto, CommentUpdateDto, Post } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: any;
  showActions: boolean = false; 
  showCommentActions: { [key: number]: boolean } = {};
  newCommentContent: string = '';
  isDeletePopupVisible: boolean = false;
  isPopupVisible = false;
  currentCommentContent = '';
  currentCommentId: number | null = null;
  newReplyContent: { [key: number]: string } = {};
  isCommentPopupVisible: boolean = false;
  commentToDelete: any = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPostById(+postId).subscribe((post) => {
        this.post = this.transformPost(post);
      });
    }
  }

  private transformPost(post: any): Post {
    if (post.comments && post.comments.$values) {
      post.comments = post.comments.$values;
      post.comments.forEach((comment: any) => {
        if (comment.replies && comment.replies.$values) {
          comment.replies = comment.replies.$values;
        }
      });
    }
    return post;
  }

  canEditOrDelete(): boolean {
    const userId = this.authService.getUserId();
    const userRole = this.authService.getUserRole();
    return userRole === 'Admin' || userId === this.post?.userId;
  }

  canEditOrDeleteComment(comment: any): boolean {
    const userId = this.authService.getUserId();
    const userRole = this.authService.getUserRole();
    return userRole === 'Admin' || userId === comment.userId;
  }

  toggleActions(): void {
    this.showActions = !this.showActions;
  }

  toggleCommentActions(commentId: number): void {
    this.showCommentActions[commentId] = !this.showCommentActions[commentId];
  }

  updatePost(): void {
    if (this.post) {
      this.router.navigate([`/update-post/${this.post.id}`]);
    }
  }

  showDeletePopup(): void {
    this.isDeletePopupVisible = true;
  }

  confirmDeletePost(): void {
    if (this.post) {
      this.postService.deletePost(this.post.id).subscribe(
        () => this.router.navigate(['/posts']),
        error => console.error(error)
      );
    }
    this.isDeletePopupVisible = false;
  }

  cancelDeletePost(): void {
    this.isDeletePopupVisible = false;
  }

  addComment(): void {
    if (this.newCommentContent.trim()) {
      const comment: CommentCreateDto = {
        title: this.newCommentContent,
        content: this.newCommentContent,
        postId: this.post.id
      };
      this.commentService.addComment(comment).subscribe(
        () => {
          this.newCommentContent = '';
          this.ngOnInit(); 
        },
        error => console.error(error)
      );
    }
  }

  editComment(comment: any): void {
    this.currentCommentId = comment.id;
    this.currentCommentContent = comment.content;
    this.isPopupVisible = true;
  }

  handleClosePopup() {
    this.isPopupVisible = false;
  }

  handleSaveChanges(updatedContent: string) {
    if (this.currentCommentId !== null) {
      const updatedComment: CommentUpdateDto = {
        content: updatedContent
      };

      this.commentService.updateComment(this.currentCommentId, updatedContent).subscribe(() => {
        this.ngOnInit(); 
        this.isPopupVisible = false;
        this.currentCommentId = null;
        window.location.reload();
      });
    }
  }

  
  deleteComment(comment: any): void {
    this.commentToDelete = comment;
    this.isCommentPopupVisible = true;
  }

  handleCommentPopupClose() {
    this.isCommentPopupVisible = false;
    this.commentToDelete = null;
  }

  handleCommentDelete() {
    if (this.commentToDelete) {
      this.commentService.deleteComment(this.commentToDelete.id).subscribe(
        () => {
          this.ngOnInit(); // Refresh the comments list
        },
        error => console.error(error)
      );
    }
    this.handleCommentPopupClose();
  }

  addReply(commentId: number): void {
    if (this.newReplyContent[commentId]?.trim()) {
      const reply: CommentCreateDto = {
        title: this.newReplyContent[commentId],
        content: this.newReplyContent[commentId],
        parentCommentId: commentId
      };
      this.commentService.addReply(commentId, reply).subscribe(
        () => {
          this.newReplyContent[commentId] = '';
          this.ngOnInit(); 
        },
        error => console.error(error)
      );
    }
  }
}
