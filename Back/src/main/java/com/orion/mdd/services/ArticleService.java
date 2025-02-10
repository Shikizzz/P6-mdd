package com.orion.mdd.services;

import com.orion.mdd.model.Article;
import com.orion.mdd.model.Comment;
import com.orion.mdd.model.Theme;
import com.orion.mdd.model.User;
import com.orion.mdd.model.dto.*;
import com.orion.mdd.repositories.ArticleRepository;
import com.orion.mdd.repositories.ThemeRepository;
import com.orion.mdd.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService {
    private ArticleRepository articleRepository;
    private UserRepository userRepository;
    private ThemeRepository themeRepository;
    private ModelMapper modelMapper;

    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository, ThemeRepository themeRepository, ModelMapper modelMapper) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.themeRepository = themeRepository;
        this.modelMapper = modelMapper;
    }

    public void addArticle(PostArticleRequest request, String email){
        User user = userRepository.findByEmail(email).get(0);
        Theme theme = themeRepository.findById(request.theme()).get();
        Article article = new Article();
        article.setUser(user);
        article.setTheme(theme);
        article.setTitle(request.title());
        article.setDate(LocalDate.now());
        article.setContent(request.content());
        articleRepository.save(article);
    }
    public ArticlePreview[] getArticlesByThemeIds(Integer[] themeIds) {
        List<Article> articles = new ArrayList<>();
        for(int i=0; i<themeIds.length; i++ ) {
            articles.addAll(articleRepository.findByThemeThemeId(themeIds[i]));
        }
        createArticlePreviewTypeMapIfNotDone();
        ArticlePreview[] articlePreviews = articles.stream()
                .map((article -> modelMapper.map(article, ArticlePreview.class)))
                .toArray(size -> new ArticlePreview[size]);
        return articlePreviews;
    }

    private void createArticlePreviewTypeMapIfNotDone(){ //Helper, to map Article to ArticlePreview
        TypeMap<Article, ArticlePreview> typeMap = modelMapper.getTypeMap(Article.class, ArticlePreview.class);
        if (typeMap == null) {
            typeMap = modelMapper.createTypeMap(Article.class, ArticlePreview.class);
            typeMap.addMappings(mapper -> {
                mapper.map(article -> article.getUser().getUsername() , ArticlePreview::setAuthor); //mapping User Object to its Username
            });
        }
    }

    public ReturnArticleDTO getArticleById(Integer id) {
        Article article = articleRepository.findById(id).get();
        createReturnArticleDTOTypeMapIfNotDone();
        ReturnArticleDTO articleDTO = modelMapper.map(article, ReturnArticleDTO.class);
        for(int i=0; i<articleDTO.getComments().size(); i++){
            articleDTO.getComments().get(i).setAuthor(article.getUser().getUsername());
        }
        return articleDTO;
    }

    private void createReturnArticleDTOTypeMapIfNotDone(){ //Helper, to map Article to ReturnArticleDTO
        TypeMap<Article, ReturnArticleDTO> typeMap = modelMapper.getTypeMap(Article.class, ReturnArticleDTO.class);
        if (typeMap == null) {
            typeMap = modelMapper.createTypeMap(Article.class, ReturnArticleDTO.class);
            typeMap.addMappings(mapper -> {
                mapper.map(article -> article.getUser().getUsername() , ReturnArticleDTO::setAuthor); //mapping User Object to its Username
                mapper.map(article -> article.getTheme().getTitle(), ReturnArticleDTO::setTheme);
                mapper.map(article -> {
                    if (article.getComments() == null) {
                        return null;
                    }
                    return article.getComments().stream().map((element) -> new CommentDTO(element.getCommentId(), element.getUser().getUsername(), element.getContent()))
                            .collect(Collectors.toList());
                }, ReturnArticleDTO::setComments);
            });
        }
    }
}
