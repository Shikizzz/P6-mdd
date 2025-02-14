package com.orion.mdd.controllers;

import com.orion.mdd.model.dto.auth.ModifyNoPassword;
import com.orion.mdd.model.dto.auth.ModifyRequest;
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

    /**
     * This modifies the user's credential in database
     * @param modifyRequest an object containing the user's id(Integer), username(String), email(String), password(String)
     * @return Http200 response with String in body
     */
    @PutMapping(value= "/password", consumes="application/json")
    public ResponseEntity<?> putUser(@Valid@RequestBody ModifyRequest modifyRequest) {
        userService.putUser(modifyRequest);
        return ResponseEntity.ok("User Modification Successfull");
    }

    @PutMapping(value= "/noPassword", consumes="application/json")
    public ResponseEntity<?> putUserNoPassword(@Valid@RequestBody ModifyNoPassword modifyRequest) {
        userService.putUserNoPassword(modifyRequest);
        return ResponseEntity.ok("User Modification Successfull");
    }

    /**
     * This modifies a User in database, to add a Theme to a User's Themes list
     * @param themeId id of the theme to add
     * @param authentication to get the User to update
     * @return Http200 response with String in body
     */
    @PutMapping(value= "/subscribe/{id}")
    public ResponseEntity<?> subscribeToTheme(@PathVariable("id") Integer themeId, Authentication authentication) {
        userService.addThemeToUser(authentication.getName(), themeId);
        return ResponseEntity.ok("Theme added successfully");
    }

    /**
     * This modifies a User in database, to remove a Theme to a User's Themes list
     * @param themeId id of the theme to add
     * @param authentication to get the User to update
     * @return Http200 response with String in body
     */
    @PutMapping(value= "/unSubscribe/{id}")
    public ResponseEntity<?> unSubscribeToTheme(@PathVariable("id") Integer themeId, Authentication authentication) {
        userService.removeThemeToUser(authentication.getName(), themeId);
        return ResponseEntity.ok("Theme removed successfully");
    }
}
