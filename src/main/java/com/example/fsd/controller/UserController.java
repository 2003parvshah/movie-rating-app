package com.example.fsd.controller;

import com.example.fsd.dto.LoginDto;
import com.example.fsd.entity.Movies;
import com.example.fsd.entity.User;
import com.example.fsd.service.UserService;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
   @Autowired
   private UserService userService;



//    @PostMapping("register_user")
//    public User saveUser(@RequestBody User user)
//    {
//        return this.userService.saveUser(user);
//    }


//    @PostMapping("register_user")
//    public Map<String, Object> saveUser(@RequestBody User user) {
//        User savedUser = this.userService.saveUser(user);
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("newdemo", "new value");
//        response.put("id", savedUser.getId());
//        response.put("name", savedUser.getName());
//        response.put("username", savedUser.getUsername());
//        response.put("password", savedUser.getPassword());
//        response.put("email", savedUser.getEmail());
//
//        return response;
//    }


    @PostMapping("/register")
    public Map<String, Object> saveUser(@RequestBody User user) {
        User savedUser = this.userService.saveUser(user);

        Map<String, Object> response = new HashMap<>();
        response.put("newdemo", "best");

        // Iterate over the fields of the User object and add them to the response map
        Field[] fields = User.class.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true); // Allow accessing private fields
            try {
                response.put(field.getName(), field.get(savedUser));
            } catch (IllegalAccessException e) {
                // Handle IllegalAccessException if needed
                e.printStackTrace();
            }
        }

        return response;
    }
    @PostMapping("/login")
    public Optional<User> loginUser(@RequestBody LoginDto loginDto)
    {
        Optional<User> user = userService.loginUser(loginDto);
        return user;
    }

    @PostMapping("/{movieId}")
    public String addwatchlist(@RequestBody String id , @PathVariable String movieId ) throws JSONException {

        JSONObject jsonObject = new JSONObject(id); // Use JSONObject instead of JSONPObject

        // Extract the value associated with the "id" key
        String idString = jsonObject.getString("id"); // Use getString method instead of toString

        // Convert the value to an integer
        int userId = Integer.parseInt(idString); // This line converts the string to int

         return userService.addMovieToWatchList(userId, movieId);
//        return "true" + movieId + userId;

    }

    @GetMapping("/{userId}")
    public List<Movies> getWatchList(@PathVariable Integer userId)
    {


        List<Movies> movieList = userService.getWatchList(userId);
        return movieList;
    }


}

