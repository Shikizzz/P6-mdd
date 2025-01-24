package com.orion.mdd.model;

import jakarta.persistence.*;

@Entity
@Table(name="comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;
    @ManyToOne(fetch = FetchType.LAZY)     //Unidirectional
    @JoinColumn(name = "user_id")
    private User user;

    private String content;
}
