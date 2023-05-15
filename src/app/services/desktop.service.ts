import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Desktop } from '../models/Desktop.model';

@Injectable({
  providedIn: 'root',
})
export class DesktopService {
  private url = environment.baseApiUrl;

  private token = window.localStorage.getItem('acc');
  private head_obj = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + this.token
  );

  constructor(private http: HttpClient) {}

  public findDesktops(): Observable<HttpResponse<Desktop>> {
    return this.http.get<Desktop>(`${this.url}/desktop`, {
      headers: this.head_obj,
      observe: 'response',
    });
  }
}
