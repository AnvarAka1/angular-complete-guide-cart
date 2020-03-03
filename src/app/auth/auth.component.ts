import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponse } from "./auth.service";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
@Component({
	selector: "auth",
	templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnDestroy {
	@ViewChild(PlaceHolderDirective, { static: false })
	alertHost: PlaceHolderDirective;

	private sub: Subscription;
	isLoginMode = true;
	isLoading = false;
	error: string = null;

	constructor(
		private authService: AuthService,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver
	) {}
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
				this.showErrorAlert(errorMessage);
				this.isLoading = false;
			}
		);
		form.reset();
	}
	errorHandler() {
		this.error = null;
	}
	closeHandler() {
		this.errorHandler();
	}
	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}
	private showErrorAlert(message: string) {
		const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();

		const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
		componentRef.instance.message = message;
		this.sub = componentRef.instance.closeEmitter.subscribe(() => {
			this.sub.unsubscribe();
			hostViewContainerRef.clear();
		});
	}
}
