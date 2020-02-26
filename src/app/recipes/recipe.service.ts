import { Injectable } from "@angular/core";

import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();
	// private recipes: Recipe[] = [
	// 	new Recipe(
	// 		"Summer Squash Salad",
	// 		"A bowl of freshly made salad",
	// 		"https://c.ndtvimg.com/2019-05/q0a2ss3g_salad_625x300_09_May_19.jpg",
	// 		[
	// 			new Ingredient("White balsamic vinegar", 1),
	// 			new Ingredient("Lemon juice", 5),
	// 			new Ingredient("Lemon rind", 2)
	// 		]
	// 	),
	// 	new Recipe(
	// 		"Meat Lovers Pizza",
	// 		"A delicious pizza recipe",
	// 		"https://c.ndtvimg.com/2019-02/e50r46mg_pizza_625x300_20_February_19.jpg",
	// 		[ new Ingredient("Millet flour", 5), new Ingredient("Tapioca flour", 5), new Ingredient("Soy milk", 15) ]
	// 	)
	// ];
	private recipes: Recipe[] = [];
	constructor(private shoppingListService: ShoppingListService) {}
	getRecipe(id: number) {
		return this.recipes[id];
	}
	getRecipes() {
		return this.recipes.slice();
	}

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}
	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}
	updateRecipe(index: number, recipe: Recipe) {
		this.recipes[index] = recipe;
		this.recipesChanged.next(this.recipes.slice());
	}
	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}
	deleteRecipe(recipeIndex: number) {
		this.recipes.splice(recipeIndex, 1);
		this.recipesChanged.next(this.recipes.slice());
	}
}
