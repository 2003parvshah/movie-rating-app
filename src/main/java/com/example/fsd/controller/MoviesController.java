package com.example.fsd.controller;

import com.example.fsd.dto.UpdateRatingDto;
import com.example.fsd.entity.Movies;
import com.example.fsd.service.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("movies")

public class MoviesController {
    @Autowired
    MoviesService moviesService;

    @GetMapping
    public List<Movies> getAllMovies() {
        return moviesService.getAllMovies();
    }

    @GetMapping("/{id}")
    public Optional<Movies> getMovies(@PathVariable String id)
    {
        return moviesService.getMovies(id);
    }

    @PutMapping("/{id}")
    public Optional<Movies> setMovies( @PathVariable String id , @RequestBody UpdateRatingDto updateRatingDto )
    {

        return moviesService.setMovies(updateRatingDto , id);
    }











}