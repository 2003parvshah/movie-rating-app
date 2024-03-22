package com.example.fsd.repository;

import com.example.fsd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
//    User findByName(String name);
//    User findById(Integer id);

//    User findByEmailAndPassword(String email, String password);

    Optional<User> findByUsernameAndPassword(String username , String password);
}
