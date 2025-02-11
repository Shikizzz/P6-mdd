import { Theme } from "../../themes/interfaces/theme.class";
import { Comment } from "./comment.class";

export class Article {
    constructor(
        public articleId: number,
        public title: string,
        public author: string,
        public theme: Theme,
        public date: Date,
        public content: string,
        public comments: Comment[]
    ) { }
}