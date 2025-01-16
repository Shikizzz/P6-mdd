package com.orion.mdd.model.dto;

import com.orion.mdd.config.PasswordValidation;
import com.orion.mdd.config.UsernameValidation;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(@NotBlank(message = "Username may not be null")
                              @UsernameValidation
                              String username,
                              @Email(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$",
                                      message = "Invalid email")
                              String email,
                              @PasswordValidation
                              String password) { }
