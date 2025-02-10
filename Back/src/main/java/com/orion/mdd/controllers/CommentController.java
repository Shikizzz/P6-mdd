package com.orion.mdd.controllers;

import com.orion.mdd.model.dto.PostComment;
import com.orion.mdd.services.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin("http://localhost:4200")
public class CommentController {
    private CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("")
    public ResponseEntity<?> postComment(@RequestBody @Valid PostComment comment, Authentication authentication) {
        String email = authentication.getName();
        commentService.addComment(comment, email);
        return ResponseEntity.ok("Comment added successfully");
    }
}
