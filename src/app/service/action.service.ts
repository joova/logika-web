import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders }    from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Action } from '../model/action';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private idmUrl = 'http://192.168.100.35:8000/api/idm';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  addAction(action: Action): Observable<Action> {
    return this.http.post<Action>(this.idmUrl + "/action", action, httpOptions).pipe(
      tap((newAction: Action) => this.log(`added action w/ id=${newAction.code}`)),
      catchError(this.handleError<Action>('addAction'))
    );
  }

  updateAction(action: Action): Observable<Action> {
    const id = action.code;
    const url = `${this.idmUrl}/action/${id}`;
    return this.http.put<Action>(url, action, httpOptions).pipe(
      tap((newAction: Action) => this.log(`udpate action w/ id=${newAction.code}`)),
      catchError(this.handleError<Action>('addAction'))
    );
  }

  deleteAction (action: Action): Observable<Action> {
    const id = action.code;
    const url = `${this.idmUrl}/action/${id}`;
  
    return this.http.delete<Action>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted action id=${id}`)),
      catchError(this.handleError<Action>('deleteAction'))
    );
  }

  getActions(): Observable<Action[]> {
    return this.http.get<Action[]>(this.idmUrl + "/actions")
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<Action[]>('getActions', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`ActionService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for action consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
