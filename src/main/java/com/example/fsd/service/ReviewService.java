package com.example.fsd.service;

import com.example.fsd.entity.Review;
import com.example.fsd.repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService
{
    @Autowired
    public ReviewRepo reviewRepo;
    public List<Review> findByMovieid(String movieId)
    {
        return reviewRepo.findByMovies_id(movieId);
    }
    public List<Review> findAll() {
        return reviewRepo.findAll();
    }
    public Review saveReview(Review review) {
        Review review1 = reviewRepo.save(review);
        return review1;
    }
}
