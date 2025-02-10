import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserInformationDTO } from "../components/auth/interfaces/userInformationDTO";
import { Observable } from "rxjs";
import { Message } from "../components/articles/interfaces/message.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private pathService = 'http://localhost:8080/api/user';

    constructor(private httpClient: HttpClient) { }

    public modifyProfile(putRequest: UserInformationDTO): Observable<void> {
        return this.httpClient.put<void>(`${this.pathService}`, putRequest);
    }

    public themeSubscribe(themeId: number): any {
        return this.httpClient.put(`${this.pathService}/subscribe/${themeId}`, null, { responseType: 'text' });
    }

    public themeUnsubscribe(themeId: number): any {
        return this.httpClient.put(`${this.pathService}/unSubscribe/${themeId}`, null, { responseType: 'text' });
    }
}