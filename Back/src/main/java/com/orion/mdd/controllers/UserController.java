package com.orion.mdd.controllers;

import com.orion.mdd.model.dto.UserInformationDTO;
import com.orion.mdd.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class UserController {
    private UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping(value= "/user", consumes="application/json")
    public ResponseEntity<?> putUser(@Valid@RequestBody UserInformationDTO request) {
        System.out.println(request.getEmail());
        System.out.println(request.getUsername());
        System.out.println(request.getId());
        userService.putUser(request);
        return ResponseEntity.ok("User Modification Successfull");
    }
}
