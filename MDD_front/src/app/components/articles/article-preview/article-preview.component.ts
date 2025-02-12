import { Component, Input } from '@angular/core';
import { ArticlePreview } from '../interfaces/articlePreview';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss'
})
export class ArticlePreviewComponent {
  @Input() article!: ArticlePreview
}
