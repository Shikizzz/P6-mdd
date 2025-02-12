package com.orion.mdd.model.dto.auth;


import com.orion.mdd.model.dto.ThemeDTO;

public class LoginResponse{
    private Integer id;
    private String username;
    private String email;
    private ThemeDTO[] themes;

    public LoginResponse(Integer id, String username, String email, ThemeDTO[] themes) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.themes = themes;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ThemeDTO[] getThemes() {
        return themes;
    }

    public void setThemes(ThemeDTO[] themes) {
        this.themes = themes;
    }
}


