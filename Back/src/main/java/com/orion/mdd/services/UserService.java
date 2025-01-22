package com.orion.mdd.services;

import com.orion.mdd.model.User;
import com.orion.mdd.model.dto.RegisterRequest;
import com.orion.mdd.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private UserRepository repository;
    private BCryptPasswordEncoder encoder;
    public UserService(UserRepository repository, BCryptPasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }
    public Boolean usernameExistsInDB(String username){
        List<User> users = repository.findByUsername(username); //usernames are unique
        return users.size()>0;
    }
    public Boolean emailExistsInDB(String email){
        List<User> users = repository.findByEmail(email); //emails are unique
        return users.size()>0;
    }
    public User findByUsernameOrEmail(String usernameOrEmail){
        List<User> user = repository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        return user.get(0);
    }


    public User findByEmail(String email){
        return repository.findByEmail(email).get(0); //emails are unique
    }
    public User findByUsername(String username){
        return repository.findByUsername(username).get(0); //usernames are unique
    }

    public void registerUser(RegisterRequest registerRequest){
        User user = new User();
        user.setUsername(registerRequest.username());
        user.setEmail(registerRequest.email());
        user.setPassword(encoder.encode(registerRequest.password()));
        repository.save(user);
    }

}
