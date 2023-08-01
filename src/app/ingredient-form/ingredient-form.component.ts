import { Component } from '@angular/core';
import {HttpService} from "../services/API/http.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent {

id = this.route.snapshot.params['id'] || null;
  ingredient = {
    id: 0,
    name: '',
  }

constructor(private http: HttpService, private router: Router, private route: ActivatedRoute) {}

ngOnInit() {
    if (this.id) {
      this.http.getData('ingredient', this.id).subscribe({
        next: (data) => this.ingredient = data,
        error: (error: Error) => console.log('Observer got an error ' + error),
        complete: () => console.log('Observer got a complete notification')
      })
    }
  }

  addIngredient() {
    this.http.postData('ingredient', this.ingredient).subscribe({
      next: (data) => console.log(data),
      error: (error: Error) => console.log('Observer got an error ' + error),
      complete: () => this.router.navigate(['/ingredient_list'])
    })
  }
}
