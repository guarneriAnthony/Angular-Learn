import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpService} from "../services/API/http.service";

@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css']
})
export class CategorieFormComponent {
  id: any;
  categorie : any

  constructor(private router: Router, private http: HttpService) {
  }

  formulaire(form: NgForm, id: any) {
    this.http.postData('category', form.value).subscribe({
        next: () => this.router.navigate(['categorie']),
        error: (error: Error) => console.log('Observer got an error ' + error),
        complete: () => console.log('Observer got a complete notification')
      }
    )
  }
}
