package com.orion.mdd.model.dto;

public class CommentDTO {
    private Integer commentId;
    private String author;
    private String content;

    public CommentDTO() {
    }

    public CommentDTO(Integer commentId, String author, String content) {
        this.commentId = commentId;
        this.author = author;
        this.content = content;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
