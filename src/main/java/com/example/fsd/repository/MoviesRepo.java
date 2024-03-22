package com.example.fsd.repository;

import com.example.fsd.entity.Movies;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MoviesRepo extends JpaRepository<Movies, Integer> {
    Optional<Movies> findById(String id);
}
