import {Component} from '@angular/core';
import {HttpService} from "../services/API/http.service";
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {
  categories: any
  constructor(private http: HttpService) {
    this.readAll();
  }
  readAll() {
   this.http.getData('category').subscribe({
       next : (data) => this.categories = data,
       error : (error : Error) => console.log('Observer got an error '+ error),
       complete : () => console.log('Observer got a complete notification')
     }
   )
  }
  delete(id: any): void {
    this.http.deleteData('category', id).subscribe({
        next : () => this.readAll(),
        error : (error : Error) => console.log('Observer got an error '+ error),
        complete : () => console.log('Observer got a complete notification')
      }
    )
  }
}
