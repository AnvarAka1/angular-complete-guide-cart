import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
	{
		path: "",
		redirectTo: "recipes",
		pathMatch: "full"
	},
	{
		path: "recipes",
		component: RecipesComponent,
		children: [
			{
				path: "details",
				component: RecipeDetailComponent
			}
		]
	},
	{ path: "shopping-list", component: ShoppingListComponent },
	{ path: "**", redirectTo: "" }
];
@NgModule({
	imports: [ RouterModule.forRoot(appRoutes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}