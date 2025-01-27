package com.orion.mdd.controllers;

import com.orion.mdd.model.Theme;
import com.orion.mdd.model.dto.ThemeDTO;
import com.orion.mdd.services.ThemeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class ThemeController {
    private ThemeService themeService;

    public ThemeController(ThemeService themeService) {
        this.themeService = themeService;
    }

    @GetMapping("/theme")
    public ResponseEntity<?> getAllThemes() {
        ThemeDTO[] themes = themeService.getAllThemes();
        return ResponseEntity.ok(themes);
    }
}
