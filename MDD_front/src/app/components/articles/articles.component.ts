import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SessionService } from '../../services/session.service';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticleService } from '../../services/article.service';
import { ArticlePreview } from './interfaces/articlePreview';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    HeaderComponent,
    ArticlePreviewComponent,],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit, OnDestroy {

  constructor(
    public sessionService: SessionService,
    public articleService: ArticleService,
    public router: Router,
  ) { }

  public onError: Boolean = false;
  public subscription!: Subscription;
  public articles: ArticlePreview[] = new Array();

  ngOnInit(): void {
    this.getArticles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private getArticles(): void {
    let themeIds: number[] = this.sessionService._sessionInformation()!.themes.map(theme =>
      theme.themeId
    )
    this.subscription = this.articleService.getArticlesByThemes(themeIds).subscribe({
      next: (articles: ArticlePreview[]) => {
        this.articles = articles
      },
      error: (error: any) => {
        this.onError = true;
        console.log(error);
      }
    })
  }

  public onAddArticle(): void {
    this.router.navigate(['articles/add'])
  }

  public onClick(id: number): void {
    this.router.navigateByUrl('articles/' + id)
  }

}
