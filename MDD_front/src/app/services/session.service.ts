import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionInformation } from "../components/auth/interfaces/sessionInformation.class";
import { Router } from "@angular/router";
import { Theme } from "../components/themes/interfaces/theme.class";

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor(
        private router: Router) {
    }

    public isLogged = false;

    public sessionInformationSig = signal<SessionInformation | undefined>(undefined);

    get sessionInformation() {
        return this.sessionInformationSig.asReadonly();
    }

    private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

    public $isLogged(): Observable<boolean> {
        return this.isLoggedSubject.asObservable();
    }

    public logIn(user: SessionInformation): void {
        this.sessionInformationSig.update(value => { return user });
        this.isLogged = true;
        this.next();
    }

    public logOut(): void {
        localStorage.removeItem('jwtToken');
        this.isLogged = false;
        this.next();
        this.router.navigate(['/auth/login'])
    }

    private next(): void {
        this.isLoggedSubject.next(this.isLogged);
    }

    public addTheme(theme: Theme): void {
        this.sessionInformationSig.update(sessionInformation => {
            let newArray = this.cloneArray(sessionInformation!.themes);
            newArray.push(theme)
            return { ...sessionInformation!, themes: newArray };
        });
    }

    public removeTheme(theme: Theme): void {
        let newArray = this.removeThemeFromArray(theme, this.sessionInformationSig()!.themes);
        this.sessionInformationSig.update(sessionInformation => {
            return { ...sessionInformation!, themes: newArray };
        });
    }

    private cloneArray(themes: Theme[]): Theme[] {
        let newArray: Theme[] = [];
        themes.forEach(value => newArray.push(value));
        return newArray;
    }

    private removeThemeFromArray(themeToRemove: Theme, themeArray: Theme[]): Theme[] {
        let newArray = this.cloneArray(themeArray);
        return newArray.filter(theme =>
            theme.themeId != themeToRemove.themeId
        )

    }
}