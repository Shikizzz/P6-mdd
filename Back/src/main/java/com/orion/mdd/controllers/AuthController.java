package com.orion.mdd.controllers;

import com.orion.mdd.model.dto.auth.LoginRequest;
import com.orion.mdd.model.dto.auth.LoginResponse;
import com.orion.mdd.model.dto.auth.RegisterRequest;
import com.orion.mdd.model.dto.auth.TokenResponse;
import com.orion.mdd.security.JWTService;
import com.orion.mdd.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:4200")
public class AuthController {
    private JWTService jwtService;
    private UserService userService;
    public AuthController(JWTService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        String token = jwtService.authenticate(loginRequest.usernameOrEmail(), loginRequest.password());
        if (token.length()>0){
            return ResponseEntity.ok(new TokenResponse(token));
        }
        else return new ResponseEntity<String>("error", HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<?> token(Authentication authentication) {
        LoginResponse response = userService.findByEmailAndReturnsDTO(authentication.getName());
        return ResponseEntity.ok(response);
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest){
        if(userService.usernameExistsInDB(registerRequest.username())){
            return new ResponseEntity<String>("Username already taken", HttpStatus.BAD_REQUEST);
        }
        if(userService.emailExistsInDB(registerRequest.email())){
            return new ResponseEntity<String>("Username already taken", HttpStatus.BAD_REQUEST);
        }
        userService.registerUser(registerRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
