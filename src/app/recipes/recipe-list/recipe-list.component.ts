import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("A test recipe",
      "This is just simply test recipe",
      "https://p0.pxfuel.com/preview/852/655/759/quinoa-seeds-proper-nutrition-a-healthy-lifestyle.jpg"
      ),
    new Recipe("A test recipe",
      "This is just simply test recipe",
      "https://p0.pxfuel.com/preview/852/655/759/quinoa-seeds-proper-nutrition-a-healthy-lifestyle.jpg"
      ),
    ];
  constructor() { }

  ngOnInit() {
  }

}
