package com.example.fsd.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String username;
    private String password;
    private String email;
    @JsonBackReference
    @ManyToMany(fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    @JoinTable(name = "watchList" , joinColumns = @JoinColumn(name = "user_id_for_watchlist" , referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "movie_id_for_watchlist" , referencedColumnName = "idM"))
    private List<Movies> moviesList;




}
