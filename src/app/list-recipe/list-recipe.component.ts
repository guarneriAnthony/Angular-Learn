import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/API/http.service";

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.css']
})

export class ListRecipeComponent {
  recipes: any
  constructor(private http: HttpService) {
  }
  ngOnInit(): void {
    this.http.getData('recipe').subscribe({
        next: (data) => this.recipes = data,
        error: (error: Error) => console.log('Observer got an error ' + error),
        complete: () => console.log(this.recipes)
      }
    );
  }


    delete(id:any)
    {
      this.http.deleteData('recipe',id).subscribe({
        next : (data) => console.log(data),
        error : (error : Error) => console.log('Observer got an error '+ error),
        complete : () => console.log('Observer got a complete notification')
      })
      this.ngOnInit()
    }

}
