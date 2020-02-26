import { HttpClient } from "@angular/common/http";
// import { Recipe } from "../recipes/recipe.model";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";
import { Ingredient } from "./ingredient.model";
@Injectable({ providedIn: "root" })
export class DataStorageService {
	constructor(private http: HttpClient, private recipeService: RecipeService) {}
	fetchRecipes() {
		return this.http.get<Recipe[]>("https://azen-1557257887036.firebaseio.com/recipes.json").pipe(
			map(recipes => {
				return recipes.map(recipe => {
					return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
				});
			}),
			tap(recipes => {
				this.recipeService.setRecipes(recipes);
			})
		);
	}
	storeRecipes() {
		const recipes = this.recipeService.getRecipes();
		this.http.put("https://azen-1557257887036.firebaseio.com/recipes.json", recipes).subscribe(res => {
			console.log(res);
		});
	}
}
