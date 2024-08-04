import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentCreateDto, CommentUpdateDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'https://localhost:44359/api/Comment';

  constructor(private http: HttpClient) { }

 
  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`);
  }

 
  getComment(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${id}`);
  }

  addComment(comment: CommentCreateDto): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  
  updateComment(commentId: number, content: string) {
    return this.http.put(`${this.apiUrl}/${commentId}`, { content });
  }
  
 
  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 
  addReply(commentId: number, reply: CommentCreateDto): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, reply);
  }
}


