package com.orion.mdd.controllers;

import com.orion.mdd.model.dto.ThemeDTO;
import com.orion.mdd.services.ThemeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/theme")
@CrossOrigin("http://localhost:4200")
public class ThemeController {
    private ThemeService themeService;

    public ThemeController(ThemeService themeService) {
        this.themeService = themeService;
    }

    /**
     * This gets all the Themes in database
     * @return all the themes in database, as ThemeDTO[]
     */
    @GetMapping("")
    public ResponseEntity<ThemeDTO[]> getAllThemes() {
        ThemeDTO[] themes = themeService.getAllThemes();
        return ResponseEntity.ok(themes);
    }
}
