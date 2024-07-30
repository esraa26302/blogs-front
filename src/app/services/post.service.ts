import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://localhost:44359/api/Post';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<{ $id: string, $values: Post[] }>(this.apiUrl).pipe(
      map(response => response.$values)
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    })
    return this.http.post<Post>(this.apiUrl, post , {headers});
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updatePost(id: number, post: Post): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, post);
  }
}


