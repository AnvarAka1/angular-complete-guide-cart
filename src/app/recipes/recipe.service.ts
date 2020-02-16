import { EventEmitter, Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
@Injectable()
export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();
	private recipes: Recipe[] = [
		new Recipe(
			"Summer Squash Salad",
			"A bowl of freshly made salad",
			"https://c.ndtvimg.com/2019-05/q0a2ss3g_salad_625x300_09_May_19.jpg",
			[
				new Ingredient("White balsamic vinegar", 0.25),
				new Ingredient("Lemon juice", 0.25),
				new Ingredient("Lemon rind", 2)
			]
		),
		new Recipe(
			"Meat Lovers Pizza",
			"A delicious pizza recipe",
			"https://c.ndtvimg.com/2019-02/e50r46mg_pizza_625x300_20_February_19.jpg",
			[ new Ingredient("Millet flour", 5), new Ingredient("Tapioca flour", 5), new Ingredient("Soy milk", 15) ]
		)
	];
	constructor(private shoppingListService: ShoppingListService) {}
	getRecipes() {
		return this.recipes.slice();
	}
	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}
}
