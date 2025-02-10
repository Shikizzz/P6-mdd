import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SessionService } from '../../services/session.service';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticleService } from '../../services/article.service';
import { ArticlePreview } from './interfaces/articlePreview';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    HeaderComponent,
    ArticlePreviewComponent,],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {

  constructor(
    public sessionService: SessionService,
    public articleService: ArticleService,
    public router: Router,
  ) { }

  public articles: ArticlePreview[] = new Array();

  ngOnInit(): void {
    this.getArticles();
  }

  private getArticles(): void {
    let themeIds: number[] = this.sessionService.sessionInformationSig()!.themes.map(theme =>
      theme.themeId
    )
    this.articleService.getArticlesByThemes(themeIds).subscribe({
      next: (articles: ArticlePreview[]) => this.articles = articles
    })
    // TODO add ERROR
  }

  public onAddArticle(): void {
    this.router.navigate(['articles/add'])
  }

  public onClick(id: number): void {
    this.router.navigateByUrl('articles/' + id)
  }

}
