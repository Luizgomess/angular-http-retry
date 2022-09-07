import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { catchError, delay, finalize, mergeMap, retryWhen, scan } from 'rxjs/operators';
import { Observable, ObservableInput, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = `https://pokeapi.co/api/`;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService) {
  }

  findAll() {
    return this.http.get<any>(this.url).pipe(
      retryWhen(err => this.retryHandler(err)),
      catchError(err => this.exceptionHandler(err)),
      finalize(() => console.log("request finalizado"))
    );
  }

  private exceptionHandler(error: HttpErrorResponse): ObservableInput<any> {
    this.toastr.error(error.message, `${error.status} - ${error.statusText}`);
    return throwError(error);
  }

  private retryHandler(error: Observable<any>): Observable<any> {
    return error.pipe(
      delay(8000),
      mergeMap(err => {
        if (err.status <= 500) return of(err);
        return throwError(err);
      }),
      scan((acc, err) => {
        if (acc > 5) throw err;
        this.toastr.warning(`Retrying the request #${acc}`, `${err.status} - Retrying`);
        return ++acc;
      }, 1));
  }

}