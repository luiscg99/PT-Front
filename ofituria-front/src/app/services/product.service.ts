import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { observable, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: string = 'http://127.0.0.1:8000/api/product/';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error(`Error:  ${error.status}, ` + `Mensaje: ${error.message}`);

    return throwError(() => error.error);
  }

  getProductos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };

    return this.http.get(this.apiUrl, httpOptions).pipe(
      map((results) => results),
      catchError(this.handleError)
    );
  }

  getProduct(idproduct: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };

    return this.http.get(this.apiUrl + idproduct, httpOptions).pipe(
      map((results) => results),
      catchError(this.handleError)
    );
  }

  createProduct(product: any): Observable<any> {
    const params = new HttpParams()
      .set('name', product.name)
      .set('price', product.price)
      .set('description', product.description);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };

    return this.http.post(this.apiUrl, params, httpOptions).pipe(
      map((results) => results),
      catchError(this.handleError)
    );
  }

  deleteProduct(idproduct: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };

    return this.http.delete(this.apiUrl + idproduct, httpOptions).pipe(
      map((results) => results),
      catchError(this.handleError)
    );
  }

  updateProduct(product: any, idproduct: any): Observable<any> {
    const params = new HttpParams()
    .set('name', product.name)
    .set('price', product.price)
    .set('description', product.description);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };

    return this.http.put(this.apiUrl + idproduct,params, httpOptions).pipe(
      map((results) => results),
      catchError(this.handleError)
    );
  }
}
