package com.orion.mdd.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="themes")
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="theme_id")
    private Integer themeId;
    @Column(name="title")
    private String title;
    @Column(name="description")
    private String description;
    @OneToMany(                     //Bidirectional
            mappedBy = "theme",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Article> articles = new ArrayList<>();

    public Theme() {
    }

    public void addArticle(Article article) {
        articles.add(article);
        article.setTheme(this);
    }

    public void removeArticle(Article article) {
        articles.remove(article);
        article.setTheme(null);
    }

    public Integer getThemeId() {
        return themeId;
    }

    public void setTopicId(Integer themeId) {
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

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }
}
