import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Article } from "../components/articles/interfaces/article.class";
import { Observable } from "rxjs";
import { ArticlePreview } from "../components/articles/interfaces/articlePreview";
import { PostArticle } from "../components/articles/interfaces/postArticle.interface";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    private pathService = 'http://localhost:8080/api/article';

    constructor(private httpClient: HttpClient) { }

    public getArticlesByThemes(themeIds: number[]): Observable<ArticlePreview[]> {
        return this.httpClient.post<ArticlePreview[]>(`${this.pathService}/get`, themeIds); //GET request doesn't allow to add body, so I use POST
    }

    public getArticle(articleId: number): Observable<Article> {
        return this.httpClient.get<Article>(`${this.pathService}/${articleId}`);
    }

    public postArticle(article: PostArticle): Observable<void> {
        return this.httpClient.post<void>(`${this.pathService}`, article); //GET request doesn't allow to add body, so I use POST
    }

}