import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PostComment } from "../components/articles/interfaces/postComment.class";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    private pathService = 'http://localhost:8080/api/comment';

    constructor(private httpClient: HttpClient) { }

    public addComment(comment: PostComment): any {
        return this.httpClient.post(`${this.pathService}`, comment, { responseType: 'text' });
    }

}