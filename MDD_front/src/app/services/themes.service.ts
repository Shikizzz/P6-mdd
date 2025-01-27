import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Theme } from "../components/themes/interfaces/theme.class";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ThemesService {

    private pathService = 'http://localhost:8080/api/theme';

    constructor(private httpClient: HttpClient) { }

    public getThemes(): Observable<Theme[]> {
        return this.httpClient.get<Theme[]>(`${this.pathService}`);
    }


}