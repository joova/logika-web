import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders }    from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Role } from '../model/role';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private idmUrl = 'http://192.168.100.35:8000/api/idm';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.idmUrl + "/role", role, httpOptions).pipe(
      tap((newRole: Role) => this.log(`added role w/ id=${newRole.id}`)),
      catchError(this.handleError<Role>('addRole'))
    );
  }

  updateRole(role: Role): Observable<Role> {
    const id = role.id;
    const url = `${this.idmUrl}/role/${id}`;
    return this.http.put<Role>(url, role, httpOptions).pipe(
      tap((newRole: Role) => this.log(`udpate role w/ id=${newRole.id}`)),
      catchError(this.handleError<Role>('addRole'))
    );
  }

  deleteRole (role: Role): Observable<Role> {
    const id = role.id;
    const url = `${this.idmUrl}/role/${id}`;
  
    return this.http.delete<Role>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted role id=${id}`)),
      catchError(this.handleError<Role>('deleteRole'))
    );
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.idmUrl + "/roles")
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<Role[]>('getRoles', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`RoleService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for role consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
