import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
@Component({
	selector: "app-header",
	templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
	isAuthorized: boolean;
	subscription: Subscription;
	constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

	ngOnInit() {
		this.subscription = this.authService.user.subscribe(user => {
			this.isAuthorized = !!user;
		});
	}

	onFetchData() {
		this.dataStorageService.fetchRecipes().subscribe();
	}
	onStoreData() {
		this.dataStorageService.storeRecipes();
	}
	onLogout() {
		this.authService.logout();
	}
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
