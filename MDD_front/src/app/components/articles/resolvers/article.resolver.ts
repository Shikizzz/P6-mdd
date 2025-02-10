import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Article } from "../interfaces/article.class";
import { ArticleService } from "../../../services/article.service";
import { inject } from "@angular/core";

export const articleResolver: ResolveFn<Article> = (
    route: ActivatedRouteSnapshot,
) => {
    return inject(ArticleService).getArticle(+route.paramMap.get('id')!);
};