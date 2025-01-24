import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionInformation } from "../interfaces/sessionInformation.class";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor(
        private router: Router) {
    }

    public isLogged = false;
    public sessionInformation: SessionInformation | undefined;

    private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

    public $isLogged(): Observable<boolean> {
        return this.isLoggedSubject.asObservable();
    }

    public logIn(user: SessionInformation): void {
        this.sessionInformation = user;
        this.isLogged = true;
        this.next();
    }

    public logOut(): void {
        localStorage.removeItem('jwtToken');
        this.sessionInformation = undefined;
        this.isLogged = false;
        this.next();
        this.router.navigate(['/auth/login'])
    }

    private next(): void {
        this.isLoggedSubject.next(this.isLogged);
    }
}