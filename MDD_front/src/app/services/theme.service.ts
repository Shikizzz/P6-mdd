import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Theme } from "../components/themes/interfaces/theme.class";
import { BehaviorSubject, catchError, Observable, take, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private pathService = 'http://localhost:8080/api/theme';

    constructor(private httpClient: HttpClient) {
        this.loadInitialData().pipe(take(1)).subscribe();
    }

    public themes: Theme[] = {} as Theme[];
    public themes$ = new BehaviorSubject<Theme[]>(this.themes)



    public loadInitialData() {
        return this.httpClient.get<Theme[]>(`${this.pathService}`).pipe(
            tap((value) => this.themes$.next(value)),
            catchError((error, caught) => {
                console.error("An error occured loading data");
                this.themes$.next(this.themes);
                return caught;
            })
        );
    }
    getThemes() {
        return this.themes$.asObservable();
    }

}