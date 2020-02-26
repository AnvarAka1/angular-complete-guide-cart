import { Component, Output, EventEmitter } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "../recipes/recipe.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html"
})
export class HeaderComponent {
	constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

	onFetchData() {
		this.dataStorageService.fetchRecipes().subscribe();
	}
	onStoreData() {
		this.dataStorageService.storeRecipes();
	}
}
