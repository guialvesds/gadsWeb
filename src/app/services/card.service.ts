import { Observable } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Card } from '../models/Card.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private urlApi = environment.baseApiUrl;
  private url: string = `${this.urlApi}/card`;

  private token = window.localStorage.getItem('acc');
  private head_obj = new HttpHeaders().set(
    'Authorization',
    'Bearer ' + this.token
  );

  constructor(private http: HttpClient) {}

  public finOnCard(id: number): Observable<HttpResponse<Card>> {
    return this.http.get<Card>(`${this.url}/${id}`, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public createCard(data: FormData, idDesktop: number): Observable<HttpResponse<Card>> {
    return this.http.post<Card>(`${this.url}/${idDesktop}`, data, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public deleteCard(id: number) {
  return this.http.delete(`${this.url}/${id}`, {
      headers: this.head_obj,
    });
  }
}
