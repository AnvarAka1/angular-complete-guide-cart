import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponse } from "./auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
	selector: "auth",
	templateUrl: "./auth.component.html"
})
export class AuthComponent {
	isLoginMode = true;
	isLoading = false;
	error: string = null;
	constructor(private authService: AuthService, private router: Router) {}
	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}
	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;
		}

		this.isLoading = true;
		this.error = null;

		let authObs: Observable<AuthResponse>;
		if (this.isLoginMode) {
			authObs = this.authService.login(form.value.email, form.value.password);
		} else {
			authObs = this.authService.signup(form.value.email, form.value.password);
		}
		authObs.subscribe(
			res => {
				console.log(res);
				this.isLoading = false;
				this.router.navigate([ "/recipes" ]);
			},
			errorMessage => {
				console.log(errorMessage);
				this.error = errorMessage;
				this.isLoading = false;
			}
		);
		form.reset();
	}
}
