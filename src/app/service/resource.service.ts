import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders }    from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Resource } from '../model/resource';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private idmUrl = 'http://192.168.100.35:8000/api/idm';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  addResource(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(this.idmUrl + "/resource", resource, httpOptions).pipe(
      tap((newResource: Resource) => this.log(`added resource w/ id=${newResource.code}`)),
      catchError(this.handleError<Resource>('addResource'))
    );
  }

  updateResource(resource: Resource): Observable<Resource> {
    const id = resource.code;
    const url = `${this.idmUrl}/resource/${id}`;
    return this.http.put<Resource>(url, resource, httpOptions).pipe(
      tap((newResource: Resource) => this.log(`udpate resource w/ id=${newResource.code}`)),
      catchError(this.handleError<Resource>('addResource'))
    );
  }

  deleteResource (resource: Resource): Observable<Resource> {
    const id = resource.code;
    const url = `${this.idmUrl}/resource/${id}`;
  
    return this.http.delete<Resource>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted resource id=${id}`)),
      catchError(this.handleError<Resource>('deleteResource'))
    );
  }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.idmUrl + "/resources")
    .pipe(
      tap(_ => this.log('fetched resources')),
      catchError(this.handleError<Resource[]>('getResources', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`ResourceService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for resource consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
