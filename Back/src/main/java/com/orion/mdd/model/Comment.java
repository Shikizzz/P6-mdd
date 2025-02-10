package com.orion.mdd.model;

import jakarta.persistence.*;

@Entity
@Table(name="comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="article_id")
    private Article article;
    @ManyToOne(fetch = FetchType.LAZY)     //Unidirectional
    @JoinColumn(name = "user_id")
    private User user;
    private String content;

    public Comment() {
    }

    public Comment(Article article, User user, String content) {
        this.article = article;
        this.user = user;
        this.content = content;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
