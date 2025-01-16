package com.orion.mdd.controllers;

import com.orion.mdd.model.dto.LoginRequest;
import com.orion.mdd.model.dto.RegisterRequest;
import com.orion.mdd.security.JWTService;
import com.orion.mdd.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {
    private JWTService jwtService;
    private UserService userService;
    public AuthController(JWTService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {

        String token = jwtService.authenticate(loginRequest.usernameOrEmail(), loginRequest.password());
        if (token.length()>0){
            return new ResponseEntity<String> (token, HttpStatus.OK);
        }
        else return new ResponseEntity<String>("error", HttpStatus.OK);
    }
    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest){
        if(userService.usernameExistsInDB(registerRequest.username())){
            return new ResponseEntity<String>("Username already taken", HttpStatus.BAD_REQUEST);
        }
        if(userService.emailExistsInDB(registerRequest.email())){
            return new ResponseEntity<String>("Username already taken", HttpStatus.BAD_REQUEST);
        }
        userService.registerUser(registerRequest);
        return new ResponseEntity<>("Register Successful",HttpStatus.OK);
    }

}
