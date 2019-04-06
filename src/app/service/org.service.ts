import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders }    from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Org } from '../model/org';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  private idmUrl = 'http://192.168.100.35:8000/api/idm';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  addOrg(org: Org): Observable<Org> {
    return this.http.post<Org>(this.idmUrl + "/org", org, httpOptions).pipe(
      tap((newOrg: Org) => this.log(`added org w/ id=${newOrg.id}`)),
      catchError(this.handleError<Org>('addOrg'))
    );
  }

  updateOrg(org: Org): Observable<Org> {
    const id = org.id;
    const url = `${this.idmUrl}/org/${id}`;
    return this.http.put<Org>(url, org, httpOptions).pipe(
      tap((newOrg: Org) => this.log(`udpate org w/ id=${newOrg.id}`)),
      catchError(this.handleError<Org>('addOrg'))
    );
  }

  deleteOrg (org: Org): Observable<Org> {
    const id = org.id;
    const url = `${this.idmUrl}/org/${id}`;
  
    return this.http.delete<Org>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted org id=${id}`)),
      catchError(this.handleError<Org>('deleteOrg'))
    );
  }

  getOrgs(): Observable<Org[]> {
    return this.http.get<Org[]>(this.idmUrl + "/orgs")
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<Org[]>('getOrgs', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`OrgService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for org consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
