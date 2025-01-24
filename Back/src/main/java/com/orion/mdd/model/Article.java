package com.orion.mdd.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer articleId;
    private String title;
    @ManyToOne(                              //Bidirectional
            cascade = CascadeType.ALL
    )
    @JoinColumn(name="topic_id")
    private Topic topic;
    @ManyToOne(                              //Unidirectional
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "user_id")
    private User user;
    private LocalDate date;
    private String content;
    @OneToMany(                             //Unidirectional
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "product_id")
    private List<Comment> comments = new ArrayList<>();

}
