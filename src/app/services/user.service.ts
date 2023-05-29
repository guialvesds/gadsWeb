import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class USerService {
  private urlApi = environment.baseApiUrl;
  private url: string = `${this.urlApi}/user/find`;

  private token = window.localStorage.getItem('acc');
  private head_obj = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + this.token
  );

  constructor(private http: HttpClient) {}

  public findUser(id: number | string | null): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.url}/${id}`, {
      headers: this.head_obj,
      observe: 'response',
    });
  }
}
