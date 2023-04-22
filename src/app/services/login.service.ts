import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  public login(dados: FormData): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.url}/login`, dados, {
      observe: 'response',
    });
  }

  public createUser(dados: FormData): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.url}/user`, dados, {
      observe: 'response',
    });
  }
}
