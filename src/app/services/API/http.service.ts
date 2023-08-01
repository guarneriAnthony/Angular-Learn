import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  postData(table: string, data: any): Observable<any> {
    return this.http.post('http://localhost/Angular/src/app/services/API/' + table + '.php?action=create', JSON.stringify(data))
  }

  getData(table: string, id: any = null): Observable<any> {
    if (id === null) {
      return this.http.get('http://localhost/Angular/src/app/services/API/' + table + '.php?action=readAll');
    } else {
      return this.http.get('http://localhost/Angular/src/app/services/API/' + table + '.php?action=readOne&id=' + id);
    }
  }

  deleteData(table: string, id: any): Observable<any> {
    return this.http.post('http://localhost/Angular/src/app/services/API/' + table + '.php?action=delete&id=' + id, {})
  }
}
