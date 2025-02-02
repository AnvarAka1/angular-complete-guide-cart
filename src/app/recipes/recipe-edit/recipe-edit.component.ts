import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Recipe } from "../recipe.model";

@Component({
	selector: "app-recipe-edit",
	templateUrl: "./recipe-edit.component.html",
	styleUrls: [ "./recipe-edit.component.css" ]
})
export class RecipeEditComponent implements OnInit {
	recipeForm: FormGroup;
	id: number;
	isEditMode = false;
	constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) {}

	ngOnInit() {
		this.initForm();
		this.route.params.subscribe((params: Params) => {
			this.id = +params["id"];
			this.isEditMode = params["id"] != null;
			this.initForm();
		});
	}
	private initForm() {
		let recipeName = "";
		let recipeImagePath = "";
		let recipeDescription = "";
		let recipeIngredients = [];
		if (this.isEditMode) {
			const recipe = this.recipeService.getRecipe(this.id);
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			recipeDescription = recipe.description;
			if (recipe.ingredients) {
				for (let ingredient of recipe.ingredients) {
					recipeIngredients.push(
						new FormGroup({
							name: new FormControl(ingredient.name, Validators.required),
							amount: new FormControl(ingredient.amount, [
								Validators.required,
								Validators.pattern(/^[1-9]+[0-9]*$/)
							])
						})
					);
				}
			}
		}
		this.recipeForm = new FormGroup({
			name: new FormControl(recipeName, Validators.required),
			imagePath: new FormControl(recipeImagePath, Validators.required),
			description: new FormControl(recipeDescription, Validators.required),
			ingredients: new FormArray(recipeIngredients)
		});
	}
	getControls() {
		return (<FormArray>this.recipeForm.get("ingredients")).controls;
	}
	onAddIngredients() {
		(<FormArray>this.recipeForm.get("ingredients")).push(
			new FormGroup({
				name: new FormControl(null, Validators.required),
				amount: new FormControl(null, [ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ])
			})
		);
	}

	onSubmit() {
		console.log(this.recipeForm.value);
		if (this.isEditMode) {
			this.recipeService.updateRecipe(this.id, this.recipeForm.value);
		} else {
			this.recipeService.addRecipe(this.recipeForm.value);
		}
		this.onCancel();
	}
	onCancel() {
		this.router.navigate([ "../" ], { relativeTo: this.route });
	}
	onRemoveIngredient(index: number) {
		(<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
	}
}
