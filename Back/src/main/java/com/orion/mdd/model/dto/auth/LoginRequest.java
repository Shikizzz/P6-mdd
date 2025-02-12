package com.orion.mdd.model.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(@NotBlank(message = "You have to enter an Email or Username")
                              String usernameOrEmail,
                              @NotBlank(message = "You have to enter Password")
                              String password) { }
