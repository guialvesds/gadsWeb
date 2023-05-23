import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Desktop } from '../models/Desktop.model';

@Injectable({
  providedIn: 'root',
})
export class DesktopService {
  private urlApi = environment.baseApiUrl;

  private token = window.localStorage.getItem('acc');
  private head_obj = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + this.token
  );

  private url: string = `${this.urlApi}/desktop`;

  constructor(private http: HttpClient) {}

  public findOneDesktop(id: number): Observable<HttpResponse<Desktop>> {
    return this.http.get<Desktop>(`${this.url}/${id}`, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public findDesktops(): Observable<HttpResponse<Desktop>> {
    return this.http.get<Desktop>(`${this.url}`, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public createDesktop(data: FormData): Observable<HttpResponse<Desktop>> {
    return this.http.post<Desktop>(`${this.url}`, data, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public deleteDesktop(id: number): void {
    this.http.delete(`${this.url}/${id}`, {
      headers: this.head_obj,
    });
  }
}
