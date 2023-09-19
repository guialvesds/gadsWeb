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

  public finOnCard(idCard: number): Observable<HttpResponse<Card>> {
    return this.http.get<Card>(`${this.url}/${idCard}`, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public createCard(
    data: FormData,
    idCard: number
  ): Observable<HttpResponse<Card>> {
    return this.http.post<Card>(`${this.url}/${idCard}`, data, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public deleteCard(idCard: number) {
    return this.http.delete(`${this.url}/${idCard}`, {
      headers: this.head_obj,
    });
  }

  public updateCard(
    idCard: number,
    data: object
  ): Observable<HttpResponse<Card>> {
    return this.http.patch<Card>(`${this.url}/${idCard}`, data, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public addMemberCard(
    id: number,
    userId: number,
    data: any
  ): Observable<HttpResponse<any>> {
    return this.http.patch<any>(`${this.url}/${id}/addMember/${userId}`, data, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public removeMemberCard(
    id: number,
    userId: number,
    data: any
  ): Observable<HttpResponse<any>> {
    return this.http.patch<any>(
      `${this.url}/${id}/removeMember/${userId}`,
      data,
      {
        headers: this.head_obj,
        observe: 'response',
      }
    );
  }

  public addListTaskCard(
    idCard: number,
    data: Object
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/list/${idCard}`, data, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public addTaskCard(
    idList: number,
    data: Object
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.url}/list/task/${idList}`, data, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public removeListCard(idList: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.url}/list/${idList}`, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public removeTaskCard(idTask: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.url}/list/task/${idTask}`, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public editTask(idTask: number, data: any): Observable<HttpResponse<any>> {
    return this.http.patch<any>(`${this.url}/list/task/${idTask}`, data, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public addMembersTaskCard(
    idTask: number,
    idUser: number,
    data: Object
  ): Observable<HttpResponse<any>> {
    return this.http.patch<any>(`${this.url}/list/task/${idTask}/addMember/${idUser}`, data, {
      headers: this.head_obj,
      observe: 'response',
    });
  }

  public findTask(
    idTask: number,
  ): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/list/task/${idTask}`, {
      headers: this.head_obj,
      observe: 'response',
    });
  }
}
