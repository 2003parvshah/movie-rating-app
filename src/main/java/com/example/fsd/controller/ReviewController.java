package com.example.fsd.controller;

import com.example.fsd.entity.Review;
import com.example.fsd.entity.User;
import com.example.fsd.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
@GetMapping("{id}")
public List<Map<String , Object>> saveUser(@PathVariable String id) {
    List<Review> reviews = this.reviewService.findByMovieid(id);
    List<Map<String , Object>> response = new ArrayList<>();
    for(int i = 0; i < reviews.size(); i++)
    {
        Review review = reviews.get(i);
        Map<String, Object> reviewMap = new HashMap<>();
        reviewMap.put("movieid", review.getMovies().getId());
        reviewMap.put("username", review.getUser().getUsername());
        reviewMap.put("id", review.getIdR());
        reviewMap.put("message", review.getMessage());
        reviewMap.put("rating", review.getRating());

        response.add(reviewMap);
    }
    return response;
}

@GetMapping
public List<Review> findAll()
{
    return reviewService.findAll();
}

@PostMapping
    public Review saveReview(@RequestBody Review review)
{
    return reviewService.saveReview(review);
}


}
