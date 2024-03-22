package com.example.fsd.service;

import com.example.fsd.dto.LoginDto;
import com.example.fsd.entity.Movies;
import com.example.fsd.entity.User;
import com.example.fsd.repository.MoviesRepo;
import com.example.fsd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

// this 2 are post method
//    {
//    to add single user
        @Autowired
        private UserRepository userRepository;

        @Autowired
        private MoviesRepo moviesRepository;
        public User saveUser(User user)
        {
            return userRepository.save(user);
        }

        public Optional<User> loginUser(LoginDto loginDto) {
                 Optional<User> user =userRepository.findByUsernameAndPassword(loginDto.username , loginDto.password);
                    return user;
        }

    public String addMovieToWatchList(Integer userId, String movieId)
    {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return "user not found";
        }

        // Find the movie by ID
        Movies movie = moviesRepository.findById(movieId).orElse(null);
        if (movie == null) {
            return "movie not found";
        }

        // Add the movie to the user's watch list
        user.getMoviesList().add(movie);
        userRepository.save(user);
        return "add to watchlist successfully ";
    }

    public List<Movies> getWatchList(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        List<Movies> moviesList = user.get().getMoviesList();
        return moviesList;
    }

//    to add multiple users
//        public List<User> saveUsers (List < User > users)
//        {
//            return userRepository.saveAll(users);
//        }
//    }
//public List<User> getUsers()
//    {
//        return userRepository.findAll();
//    }
//    public User getUserById(int id)
//    {
//        return userRepository.findById(id).orElse( null);
//    }
//    public User getUserByName(String name)
//    {
//        return userRepository.findByName(name).orElse(null);
//    }
}
