import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserInformationDTO } from "../components/auth/interfaces/userInformationDTO";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private pathService = 'http://localhost:8080/api/user';

    constructor(private httpClient: HttpClient) { }

    public modifyProfile(putRequest: UserInformationDTO): Observable<void> {
        return this.httpClient.put<void>(`${this.pathService}`, putRequest);
    }

    public themeSubscribe(themeId: number): Observable<void> {
        return this.httpClient.put<void>(`${this.pathService}/subscribe/${themeId}`, null);
    }

    public themeUnsubscribe(themeId: number): Observable<void> {
        return this.httpClient.put<void>(`${this.pathService}/unSubscribe/${themeId}`, null);
    }
}