import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";

import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
@Component({
	selector: "app-shopping-edit",
	templateUrl: "./shopping-edit.component.html",
	styleUrls: [ "./shopping-edit.component.css" ]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	@ViewChild("f", { static: false })
	slForm: NgForm;

	subscription: Subscription;
	isEditMode = false;
	editedItemIndex: number;
	editedItem: Ingredient;
	constructor(private shoppingListService: ShoppingListService) {}

	ngOnInit() {
		this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
			this.editedItemIndex = index;
			this.isEditMode = true;
			this.editedItem = this.shoppingListService.getIngredient(index);
			this.slForm.setValue({
				name: this.editedItem.name,
				amount: this.editedItem.amount
			});
		});
	}
	onSubmit(form: NgForm) {
		const value = form.value;
		const newIngredient = new Ingredient(value.name, value.amount);
		if (this.isEditMode) {
			this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
		} else {
			this.shoppingListService.addIngredient(newIngredient);
		}
		this.isEditMode = false;
		this.slForm.reset();
	}
	onDelete() {
		this.onClear();
		this.shoppingListService.deleteIngredient(this.editedItemIndex);
	}
	onClear() {
		this.slForm.reset();
		this.isEditMode = false;
	}
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
