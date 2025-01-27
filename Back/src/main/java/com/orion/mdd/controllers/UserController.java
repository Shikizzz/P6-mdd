package com.orion.mdd.controllers;

import com.orion.mdd.model.dto.UserInformationDTO;
import com.orion.mdd.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("http://localhost:4200")
public class UserController {
    private UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping(value= "", consumes="application/json")
    public ResponseEntity<?> putUser(@Valid@RequestBody UserInformationDTO request) {
        userService.putUser(request);
        return ResponseEntity.ok("User Modification Successfull");
    }

    @PutMapping(value= "/subscribe/{id}")
    public ResponseEntity<?> subscribeToTheme(@PathVariable("id") Integer themeId, Authentication authentication) {
        userService.addThemeToUser(authentication.getName(), themeId);
        return ResponseEntity.ok("Theme added successfully");
    }

    @PutMapping(value= "/unSubscribe/{id}")
    public ResponseEntity<?> unSubscribeToTheme(@PathVariable("id") Integer themeId, Authentication authentication) {
        userService.removeThemeToUser(authentication.getName(), themeId);
        return ResponseEntity.ok("Theme removed successfully");
    }
}
