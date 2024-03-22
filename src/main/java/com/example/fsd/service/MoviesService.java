package com.example.fsd.service;

import com.example.fsd.dto.UpdateRatingDto;
import com.example.fsd.entity.Movies;
import com.example.fsd.repository.MoviesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MoviesService {
    @Autowired
private MoviesRepo moviesRepo;
public List<Movies> getAllMovies(){return moviesRepo.findAll();}

    public Optional<Movies> getMovies(String id) {
        return  moviesRepo.findById(id);
    }

    public Optional<Movies> setMovies(UpdateRatingDto updateRatingDto, String id) {
        Movies movie = moviesRepo.findById(id).orElse(null);

        if (movie != null) {
            movie.setRating_counts(updateRatingDto.rating_counts);
            movie.setAvg_rating(updateRatingDto.avg_rating);
            moviesRepo.save(movie);
            return Optional.of(movie);
        }
        else return Optional.empty();
    }
}
