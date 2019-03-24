import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders }    from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private idmUrl = 'http://192.168.100.35:8000/api/idm';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.idmUrl + "/user", user, httpOptions).pipe(
      tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  updateUser(user: User): Observable<User> {
    const id = user.id;
    const url = `${this.idmUrl}/user/${id}`;
    return this.http.put<User>(url, user, httpOptions).pipe(
      tap((newUser: User) => this.log(`udpate user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  deleteUser (user: User): Observable<User> {
    const id = user.id;
    const url = `${this.idmUrl}/user/${id}`;
  
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.idmUrl + "/users")
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
