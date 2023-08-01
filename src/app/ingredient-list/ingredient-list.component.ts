import { Component } from '@angular/core';
import {HttpService} from "../services/API/http.service";

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent {
  ingredients: any;
  constructor(private http:HttpService) {}
ngOnInit() {
    this.http.getData('ingredient').subscribe({
      next: (data) => this.ingredients = data,
      error: (err) => console.log(err),
      complete: () => console.log('complete')
    })
  }

  delete(id:number){
    this.http.deleteData('ingredient',id).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
      complete: () => this.ngOnInit()
    })
  }
}
