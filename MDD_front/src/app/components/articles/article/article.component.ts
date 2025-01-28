import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../interfaces/article.class';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {

  public article!: Article;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let articleId = this.route.snapshot.params['id'] as number;
    this.findArticleById(articleId);
  }

  public findArticleById(id: number): void {
    this.articleService.getArticle(id).subscribe({
      next: (article: Article) => this.article = article
    })
    // TODO add ERROR
  }
}
