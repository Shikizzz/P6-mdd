package com.orion.mdd.security;

import com.orion.mdd.model.User;
import com.orion.mdd.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private UserRepository userRepository;
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        List<User> user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (user.size() != 1) {
            throw new UsernameNotFoundException("User not found with Username or Email: " + usernameOrEmail);
        }
        return new org.springframework.security.core.userdetails.User(user.get(0).getEmail(), user.get(0).getPassword(), new ArrayList<>()); //empty GrantedAuthorities
    }
}