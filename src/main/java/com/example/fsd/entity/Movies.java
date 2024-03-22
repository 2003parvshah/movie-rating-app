package com.example.fsd.entity;

//import jakarta.persistence.Entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
//import jakarta.persistence.GeneratedValue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import org.springframework.data.annotation.Id;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Movies
{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer idM;
        private String id;
        private String cover_image;
        private String movie_name;
        private String overview;
        private String poster_image;
//        @ElementCollection
        private String category;
        private String release_date;
        private String trailer;
        private String avg_rating;
        private String boxoffice_collection;
        private String rating_counts;

        @JsonBackReference
        @ManyToMany(mappedBy = "moviesList")
        private List<User> userList;
}
