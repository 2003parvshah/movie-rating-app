package com.example.fsd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class FsdApplication {

    public static void main(String[] args) {
        SpringApplication.run(FsdApplication.class, args);
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // Allow requests from all origins
        config.addAllowedOrigin("*");
        // Allow specific HTTP methods (e.g., GET, POST, PUT, DELETE)
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        // Allow specific headers (e.g., Content-Type, Authorization)
        config.addAllowedHeader("Content-Type");
        config.addAllowedHeader("Authorization");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply CORS configuration to all URLs
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }

}
