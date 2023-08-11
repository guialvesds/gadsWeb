import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/Comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private urlApi = environment.baseApiUrl;
  private url: string = `${this.urlApi}/comment/card`;

  private token = window.localStorage.getItem('acc');
  private head_obj = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + this.token
  );

  constructor(private http: HttpClient) {}

  public findCommentCard(idComment: number): Observable<HttpResponse<Comment>> {
    return this.http.get<Comment>(`${this.url}/${idComment}`, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public createCommentCard(idCard: number, data: FormData): Observable<HttpResponse<Comment>> {
    return this.http.post<Comment>(`${this.url}/${idCard}`, data, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public deleteCommentCard(idComment: number) {
  return this.http.delete(`${this.url}/${idComment}`, {
      headers: this.head_obj,
    });
  }
}

