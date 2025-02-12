package com.orion.mdd.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PostArticleRequest(
        @NotNull Integer theme, //id of the theme
        @NotBlank String title,
        @NotBlank String content)
{ }