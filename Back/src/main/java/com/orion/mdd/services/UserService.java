package com.orion.mdd.services;

import com.orion.mdd.model.Theme;
import com.orion.mdd.model.User;
import com.orion.mdd.model.dto.auth.LoginResponse;
import com.orion.mdd.model.dto.auth.ModifyNoPassword;
import com.orion.mdd.model.dto.auth.RegisterRequest;
import com.orion.mdd.model.dto.ThemeDTO;
import com.orion.mdd.model.dto.auth.ModifyRequest;
import com.orion.mdd.repositories.ThemeRepository;
import com.orion.mdd.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;
    private final BCryptPasswordEncoder encoder;
    private final ModelMapper modelMapper;


    public UserService(UserRepository userRepository, ThemeRepository themeRepository, BCryptPasswordEncoder encoder,
                       ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.themeRepository = themeRepository;
        this.encoder = encoder;
        this.modelMapper = modelMapper;
    }
    public Boolean usernameExistsInDB(String username){
        List<User> users = userRepository.findByUsername(username); //usernames are unique
        return users.size()>0;
    }
    public Boolean emailExistsInDB(String email){
        List<User> users = userRepository.findByEmail(email); //emails are unique
        return users.size()>0;
    }
    public User findByUsernameOrEmail(String usernameOrEmail){
        List<User> user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        return user.get(0);
    }


    public LoginResponse findByEmailAndReturnsDTO(String email){
        User user = userRepository.findByEmail(email).get(0);
        ThemeDTO[] themes = user.getThemes().stream()
                .map((element) -> modelMapper.map(element, ThemeDTO.class))
                .toArray(size -> new ThemeDTO[size]);
        LoginResponse response = new LoginResponse(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                themes
        );
        return response;
    }

    public void registerUser(RegisterRequest registerRequest){
        User user = new User();
        user.setUsername(registerRequest.username());
        user.setEmail(registerRequest.email());
        user.setPassword(encoder.encode(registerRequest.password()));
        userRepository.save(user);
    }
    public void putUser(ModifyRequest request){
        User user = userRepository.findById(request.getId()).get(); // ID in DB, because sent from front, that get it from Backend's DB
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(encoder.encode(request.getPassword()));
        userRepository.save(user);
    }
    public void putUserNoPassword(ModifyNoPassword request){
        User user = userRepository.findById(request.getId()).get(); // ID in DB, because sent from front, that get it from Backend's DB
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        userRepository.save(user);
    }

    public void addThemeToUser(String email, Integer themeId) {
        User user = userRepository.findByEmail(email).get(0);
        Theme theme = themeRepository.findById(themeId).get();
        user.getThemes().add(theme);
        userRepository.save(user);
    }
    public void removeThemeToUser(String email, Integer themeId) {
        User user = userRepository.findByEmail(email).get(0);
        Theme themeToRemove = themeRepository.findById(themeId).get();
        List<Theme> updatedThemes = user.getThemes().stream().filter(
                (theme) -> !theme.getThemeId().equals(themeToRemove.getThemeId()))
                .toList();
        ArrayList<Theme> updatedThemesArraylist = new ArrayList<>(updatedThemes);
        user.setThemes(updatedThemesArraylist);
        userRepository.save(user);
    }
}
