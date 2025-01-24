import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserInformationDTO } from "../interfaces/userInformationDTO";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private pathService = 'http://localhost:8080/api/user';

    constructor(private httpClient: HttpClient) { }

    public modifyProfile(putRequest: UserInformationDTO, token: string): Observable<void> {
        return this.httpClient.put<void>(`${this.pathService}`, putRequest);
    }
}