package com.example.fsd.repository;

import com.example.fsd.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, Integer> {
    public List<Review> findByMovies_id(String movieId);

}
