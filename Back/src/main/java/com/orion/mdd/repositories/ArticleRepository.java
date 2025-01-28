package com.orion.mdd.repositories;

import com.orion.mdd.model.Article;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    public List<Article> findByThemeThemeId(Integer themeId);
}
