package com.orion.mdd.model.dto;

import com.orion.mdd.model.User;

public class CommentDTO {
    private User user;
    private String content;

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
