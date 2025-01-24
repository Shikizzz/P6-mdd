import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterRequest } from "../interfaces/registerRequest.interface";
import { LoginRequest } from "../interfaces/loginRequest.interface";
import { UserInformationDTO } from "../interfaces/userInformationDTO";
import { AuthSuccess } from "../components/auth/interfaces/authSuccess.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private pathService = 'http://localhost:8080/api/auth';

    constructor(private httpClient: HttpClient) { }

    public register(registerRequest: RegisterRequest): Observable<void> {
        return this.httpClient.post<void>(`${this.pathService}/register`, registerRequest);
    }

    public login(loginRequest: LoginRequest): Observable<AuthSuccess> {
        return this.httpClient.post<AuthSuccess>(`${this.pathService}/login`, loginRequest);
    }

    public authenticate(token: string): Observable<UserInformationDTO> {
        const httpHeaders: HttpHeaders = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return this.httpClient.get<UserInformationDTO>(`${this.pathService}/me`, { headers: httpHeaders });
    }
}