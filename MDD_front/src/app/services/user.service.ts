import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserInformationDTO } from "../components/auth/interfaces/userInformationDTO.interface";
import { Observable } from "rxjs";
import { Message } from "../components/articles/interfaces/message.interface";
import { ModifyRequest } from "../components/profile/interfaces/modifyRequest.interface";
import { ModifyNoPassword } from "../components/profile/interfaces/modifyNoPassword.class";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private pathService = 'http://localhost:8080/api/user';

    constructor(private httpClient: HttpClient) { }

    public modifyProfile(putRequest: ModifyRequest): any {
        return this.httpClient.put(`${this.pathService}/password`, putRequest, { responseType: 'text' });
    }
    public modifyProfileNoPassword(putRequest: ModifyNoPassword): any {
        return this.httpClient.put(`${this.pathService}/noPassword`, putRequest, { responseType: 'text' });
    }

    public themeSubscribe(themeId: number): any {
        return this.httpClient.put(`${this.pathService}/subscribe/${themeId}`, null, { responseType: 'text' });
    }

    public themeUnsubscribe(themeId: number): any {
        return this.httpClient.put(`${this.pathService}/unSubscribe/${themeId}`, null, { responseType: 'text' });
    }
}