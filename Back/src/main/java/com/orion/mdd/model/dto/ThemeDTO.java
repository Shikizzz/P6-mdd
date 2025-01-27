package com.orion.mdd.model.dto;

import jakarta.persistence.Column;

public class ThemeDTO {
    private Integer themeId;

    private String title;

    private String description;

    public ThemeDTO() {
    }

    public ThemeDTO(Integer themeId, String title, String description) {
        this.themeId = themeId;
        this.title = title;
        this.description = description;
    }

    public Integer getThemeId() {
        return themeId;
    }

    public void setThemeId(Integer themeId) {
        this.themeId = themeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
