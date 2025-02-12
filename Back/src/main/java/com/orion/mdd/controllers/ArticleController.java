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

    /**
     * This adds an article in database
     * @param postArticleRequest an Object containing: theme (Integer, the Id of the Theme), title (String, the article's title), content (String, the article's content)
     * @param authentication to get the User posting the article
     * @return Http200 response, no body
     */
    @PostMapping
    public ResponseEntity<?> addArticle(Authentication authentication,@Valid @RequestBody PostArticleRequest postArticleRequest) {
        articleService.addArticle(postArticleRequest, authentication.getName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * This gets all the Articles concerning given Themes
     * @param themeIds , an Array of Integer reprensenting the Ids of all the themes the user is subscribed
     * @return All the articles with the Themes given
     */
    @PostMapping("/get")
    public ResponseEntity<ArticlePreview[]> getArticlesByThemes(@RequestBody Integer[] themeIds) {
        ArticlePreview[] articles = articleService.getArticlesByThemeIds(themeIds);
        return ResponseEntity.ok(articles);
    }

    /**
     * This gets all the article details
     * @param id , an Integer, the id of the Article wanted
     * @return the Article
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReturnArticleDTO> getArticlesByThemes(@PathVariable("id") Integer id) {
        ReturnArticleDTO articleDTO = articleService.getArticleById(id);
        return ResponseEntity.ok(articleDTO);
    }


}
