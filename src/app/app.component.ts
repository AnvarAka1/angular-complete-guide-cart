import { Component } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: [ "./app.component.css" ]
})
export class AppComponent {
	isRecipesPage: boolean = true;

	onRecepesPageOpened(isRecipesPage: boolean) {
		this.isRecipesPage = isRecipesPage;
	}
}
