import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  baseUrl = 'http://localhost:4401/api/';

  constructor(private http: HttpClient) { }

  post<T>(urlPart: string, data: T) {

    const url = this.getUrl(urlPart);
    return this.http.post<T>(url, JSON.stringify(data), this.httpOptions);
  }

  put<T>(urlPart: string, data: T) {

    const url = this.getUrl(urlPart);

    return this.http.put<T>(url, JSON.stringify(data), this.httpOptions);
  }

  get<T>(urlPart: string) {

    const url = this.getUrl(urlPart);

    return this.http.get<T>(url);
  }

  delete(urlPart: string) {

    const url = this.getUrl(urlPart);

    return this.http.delete(url);
  }

  getUrl(urlPart: string): string {
    return `${this.baseUrl}${urlPart}`;
  }
}
