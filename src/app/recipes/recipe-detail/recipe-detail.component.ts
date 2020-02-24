import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
@Component({
	selector: "app-recipe-detail",
	templateUrl: "./recipe-detail.component.html",
	styleUrls: [ "./recipe-detail.component.css" ]
})
export class RecipeDetailComponent implements OnInit {
	@Input() recipeDetail: Recipe;
	id: number;
	constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}
	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = +params["id"];
			this.recipeDetail = this.recipeService.getRecipe(this.id);
		});
	}
	onAddToShoppingList() {
		console.log(this.recipeDetail.ingredients);
		this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients);
	}
	onEditRecipe() {
		this.router.navigate([ "edit" ], { relativeTo: this.route });
	}
	onDeleteRecipe() {
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate([ "/recipes" ]);
	}
}
