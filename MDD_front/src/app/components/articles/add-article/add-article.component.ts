import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { Theme } from '../../themes/interfaces/theme.class';
import { NgFor } from '@angular/common';
import { ArticleService } from '../../../services/article.service';
import { PostArticle } from '../interfaces/postArticle.interface';
import { ThemeService } from '../../../services/theme.service';
import { Observable } from 'rxjs';

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

  private themeService: ThemeService = inject(ThemeService)

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private articleService: ArticleService) { }

  public form!: FormGroup;
  public themes$: Observable<Theme[]> = this.themeService.themes$;
  public themes: Theme[] = this.themeService.themes;


  ngOnInit(): void {
    this.themes$.subscribe(themes => {
      this.themes = themes
    })

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


  public onSubmit() {
    let request: PostArticle = this.form.value as PostArticle;
    this.articleService.postArticle(request).subscribe({
      next: (_: any) => {
        this.router.navigate(['/articles'])
      }
    });
  }

}
