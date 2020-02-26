import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
export interface AuthResponse {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}
@Injectable({ providedIn: "root" })
export class AuthService {
	user = new BehaviorSubject<User>(null);
	private expiration: any;
	constructor(private http: HttpClient, private router: Router) {}

	autoLogin() {
		const userData: {
			email: string;
			id: string;
			_token: string;
			_tokenExpirationDate: string;
		} = JSON.parse(localStorage.getItem("userData"));
		console.log(userData);
		if (!userData) {
			return;
		}
		const { email, id, _token, _tokenExpirationDate } = userData;
		const loadedUser = new User(email, id, _token, new Date(_tokenExpirationDate));
		if (loadedUser.token) {
			this.user.next(loadedUser);
			const expirationDuration = new Date(_tokenExpirationDate).getTime() - new Date().getTime();
			this.autoLogout(expirationDuration);
		}
	}

	login(email: string, password: string) {
		return this.http
			.post<
				AuthResponse
			>(
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDX7XJGPnUq-Xy2xjz4ZcmAwuiQ1jBs1ms",
				{
					email: email,
					password: password,
					returnSecureToken: true
				}
			)
			.pipe(
				catchError(this.handleError),
				tap(resData => {
					const { email, idToken, expiresIn, localId } = resData;
					this.handleAuthentication(email, localId, idToken, +expiresIn);
				})
			);
	}

	signup(email: string, password: string) {
		return this.http
			.post<
				AuthResponse
			>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDX7XJGPnUq-Xy2xjz4ZcmAwuiQ1jBs1ms", {
				email: email,
				password: password,
				returnSecureToken: true
			})
			.pipe(
				catchError(this.handleError),
				tap(resData => {
					const { email, idToken, expiresIn, localId } = resData;
					this.handleAuthentication(email, localId, idToken, +expiresIn);
				})
			);
	}

	logout() {
		this.user.next(null);
		this.router.navigate([ "/auth" ]);
		localStorage.removeItem("userData");
		if (this.expiration) {
			clearTimeout(this.expiration);
		}
		this.expiration = null;
	}
	autoLogout(expirationTime: number) {
		console.log(expirationTime);
		this.expiration = setTimeout(() => {
			this.logout();
		}, expirationTime);
	}

	private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
		const expires = new Date(new Date().getTime() + +expiresIn * 1000);
		const user = new User(email, userId, token, expires);
		this.user.next(user);
		this.autoLogout(expiresIn * 1000);
		localStorage.setItem("userData", JSON.stringify(user));
	}

	private handleError(errorRes: HttpErrorResponse) {
		let errorMessage = "Uknown error";
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorMessage);
		}
		switch (errorRes.error.error.message) {
			case "EMAIL_EXISTS":
				errorMessage = "This email already exists";
				break;
			case "EMAIL_NOT_FOUND":
				errorMessage = "This email does not exist";
				break;
			case "INVALID_PASSWORD":
				errorMessage = "Incorrect password!";
				break;
		}
		return throwError(errorMessage);
	}
}
