import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { ThemesService } from '../../../services/themes.service';
import { Theme } from '../../themes/interfaces/theme.class';
import { NgFor } from '@angular/common';
import { ArticleService } from '../../../services/article.service';
import { PostArticle } from '../interfaces/postArticle.interface';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    HeaderComponent,
    NgFor],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss'
})
export class AddArticleComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private themeService: ThemesService,
    private articleService: ArticleService) { }

  public form!: FormGroup;
  public themes!: Theme[];


  ngOnInit(): void {

    this.getThemes();

    this.form = this.fb.group({
      theme: [
        "",
        [Validators.required,]
      ],
      title: [
        "",
        [Validators.required,]
      ],
      content: [
        "",
        [Validators.required,]
      ]
    });
  }

  private getThemes(): void {
    this.themeService.getThemes().subscribe({
      next: (themes: Theme[]) => {
        this.themes = themes
      }
    });
  }


  public onSubmit() {
    let request: PostArticle = this.form.value as PostArticle;
    this.articleService.postArticle(request).subscribe({
      next: (_: any) => {
        this.router.navigate(['/articles'])
      }
    });
  }

}
