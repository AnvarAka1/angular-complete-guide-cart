import { Component, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html"
})
export class HeaderComponent {
	@Output() recepesPageOpened = new EventEmitter<boolean>();

	recipesPageOpened(isRecipesPage) {
		this.recepesPageOpened.emit(isRecipesPage);
	}
}
