package com.orion.mdd.services;

import com.orion.mdd.model.Article;
import com.orion.mdd.model.Comment;
import com.orion.mdd.model.User;
import com.orion.mdd.model.dto.PostComment;
import com.orion.mdd.repositories.ArticleRepository;
import com.orion.mdd.repositories.CommentRepository;
import com.orion.mdd.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    private CommentRepository commentRepository;
    private UserRepository userRepository;
    private ArticleRepository articleRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
    }

    public void addComment(PostComment postComment, String email){
        User user = userRepository.findByEmail(email).get(0); //Unicity and existence
        Article article = articleRepository.findById(postComment.getArticleId()).get(); //Unicity and existence
        Comment comment = new Comment(article, user, postComment.getContent());
        commentRepository.save(comment);
    }
}
