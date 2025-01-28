package com.orion.mdd.controllers;

import com.orion.mdd.model.dto.ArticlePreview;
import com.orion.mdd.model.dto.PostArticleRequest;
import com.orion.mdd.model.dto.ReturnArticleDTO;
import com.orion.mdd.services.ArticleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/article")
@CrossOrigin("http://localhost:4200")
public class ArticleController {
    private ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ResponseEntity<?> addArticle(Authentication authentication,@Valid @RequestBody PostArticleRequest request) {
        articleService.addArticle(request, authentication.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/get")
    public ResponseEntity<?> getArticlesByThemes(@RequestBody Integer[] ThemeIds) {
        ArticlePreview[] articles = articleService.getArticlesByThemeIds(ThemeIds);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getArticlesByThemes(@PathVariable("id") Integer id) {
        ReturnArticleDTO articleDTO = articleService.getArticleById(id);
        return ResponseEntity.ok(articleDTO);
    }


}
