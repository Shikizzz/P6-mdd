package com.orion.mdd.repositories;

import com.orion.mdd.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByEmail(String email);
    List<User> findByUsername(String username);
    List<User> findByUsernameOrEmail(String username, String password);

}
