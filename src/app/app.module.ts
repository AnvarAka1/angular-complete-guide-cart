import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { AuthComponent } from "./auth/auth.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";

import { DropdownDirective } from "./shared/dropdown.directive";

import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RecipeService } from "./recipes/recipe.service";
import { AuthInterceptor } from "./auth/auth-interceptor.service";
import { AlertComponent } from "./shared/alert/alert.component";
import { PlaceHolderDirective } from "./shared/placeholder/placeholder.directive";
// import { AuthGuard } from "./auth/auth.guard";
@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		RecipesComponent,
		RecipeListComponent,
		RecipeItemComponent,
		RecipeDetailComponent,
		ShoppingListComponent,
		ShoppingEditComponent,
		DropdownDirective,
		RecipeStartComponent,
		RecipeEditComponent,
		AuthComponent,
		LoadingSpinnerComponent,
		AlertComponent,
		PlaceHolderDirective
	],
	imports: [ BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule ],
	providers: [
		ShoppingListService,
		RecipeService,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [ AppComponent ],
	entryComponents: [ AlertComponent ]
})
export class AppModule {}
