import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article } from '../interfaces/article.class';
import { HeaderComponent } from '../../header/header.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommentService } from '../../../services/comment.service';
import { PostComment } from '../interfaces/postComment.class';
import { CommentContent } from '../interfaces/commentContent.interface';
import { Comment } from '../interfaces/comment.class';
import { SessionService } from '../../../services/session.service';
import { Subscription } from 'rxjs';

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
export class ArticleComponent implements OnInit, OnDestroy {

  public onError: Boolean = false;
  public subscription: Subscription | undefined;
  public _article!: WritableSignal<Article>;
  public form!: FormGroup;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this._article = signal(this.route.snapshot.data['articleDetails']);

    this.form = this.fb.group({
      content: [
        "",
        [Validators.required,]
      ]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription != undefined) {
      this.subscription.unsubscribe()
    }
  }

  public onClick(): void {
    const commentContent = this.form.value as CommentContent;
    let comment: PostComment = new PostComment(commentContent.content, this._article().articleId);
    this.subscription = this.commentService.addComment(comment).subscribe({
      next: (_: void) => {
        this._article.update(article => {
          let newArray: Comment[] = this.cloneArray(article.comments);
          let comment: Comment = new Comment(this.sessionService._sessionInformation()!.username, commentContent.content);
          newArray.push(comment)
          return { ...article, comments: newArray };
        })
      },
      error: (error: any) => {
        this.onError = true;
        console.log(error);
      }
    });
  }

  private cloneArray(comments: Comment[]): Comment[] {
    let newArray: Comment[] = [];
    comments.forEach(value => newArray.push(value));
    return newArray;
  }

}
