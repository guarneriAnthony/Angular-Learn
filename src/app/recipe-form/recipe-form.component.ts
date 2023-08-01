import {Component, numberAttribute} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from "../services/API/http.service";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {

  categories: any
  ingredients: any
  id = this.route.snapshot.params['id'] || null
  recette = {
    id : 0,
    title : '',
    description : '',
    cost : '',
    preparation_time: '',
    cooking_time: '',
    difficulty: '',
    id_category: '',
    picture: '',
  }

  constructor(private http: HttpService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(){
    this.http.getData('category').subscribe({
      next: value => this.categories = value,
      error: err => console.log(err),
      complete: () => console.log("Cest completed")
    })
  }


  addForm() {
    this.http.postData('recipe', this.recette).subscribe({
      next: () => this.router.navigate(['/listRecipe']),
      error: err => console.log(err),
      complete: () => console.log("Post effectue")
    })
  }

}
