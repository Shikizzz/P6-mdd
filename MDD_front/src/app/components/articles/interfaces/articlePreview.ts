export class ArticlePreview {
    constructor(
        public articleId: number,
        public title: string,
        public author: string,
        public date: Date,
        public content: string,
    ) { }
}