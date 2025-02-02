import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
		console.log("here");
		return this.authService.user.pipe(
			take(1),
			map(user => {
				const isAuth = !!user;
				if (isAuth) {
					console.log("test1");
					return true;
				}
				console.log("test");
				return this.router.createUrlTree([ "/auth" ]);
			})
			// tap(isAuth => {
			// 	if (isAuth) {
			// 		this.router.navigate([ "/auth" ]);
			// 	}
			// })
		);
	}
}
