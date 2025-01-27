import { Theme } from "../../themes/interfaces/theme.class";
import { Comment } from "../interfaces/comment.interface";

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