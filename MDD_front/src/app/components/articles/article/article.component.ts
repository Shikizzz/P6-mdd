import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article } from '../interfaces/article.class';
import { HeaderComponent } from '../../header/header.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommentService } from '../../../services/comment.service';
import { PostComment } from '../interfaces/postComment.class';
import { CommentContent } from '../interfaces/commentContent.interface';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIcon,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {

  public article!: Article;
  public form!: FormGroup;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.article = this.route.snapshot.data['articleDetails'];

    this.form = this.fb.group({
      content: [
        "",
        [Validators.required,]
      ]
    });
  }

  public onClick(): void {
    const commentContent = this.form.value as CommentContent;
    let comment: PostComment = new PostComment(commentContent.content, this.article.articleId);
    this.commentService.addComment(comment).subscribe({
      next: (_: void) => {
      },
    });
  }

}
