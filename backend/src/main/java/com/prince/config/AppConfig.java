package com.prince.config;

import java.util.Arrays; // Kept as it's used in CORS configuration

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class AppConfig {

    // Security filter chain with updated authorization configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Apply CORS configuration first
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session for JWT
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/admin/**").hasAnyRole("RESTAURANT_OWNER", "ADMIN")
                .requestMatchers("/api/v1/user/register").permitAll() // Allow registration for all
                .requestMatchers("/api/v1/user/login").permitAll() // Allow login for all
                .requestMatchers("/api/v1/**").authenticated() // Protect all other APIs
                .anyRequest().permitAll()
            )
            .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class) // Add JWT token filter
            .csrf(csrf -> csrf.disable()); // Disable CSRF for stateless APIs

        return http.build();
    }

    // CORS configuration to allow requests from specific origins
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://192.168.56.1:3000", "http://localhost:3000")); // Frontend URL
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfiguration.setAllowCredentials(true); // Allow credentials
        corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        corsConfiguration.setExposedHeaders(Arrays.asList("Authorization")); // Expose Authorization header
        corsConfiguration.setMaxAge(3600L); // Cache pre-flight requests for 1 hour

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }


    // Password encoder bean for user authentication
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // JWT provider bean for token generation/validation
    @Bean
    public JwtProvider jwtProvider() {
        return new JwtProvider();
    }

    // Authentication manager bean for Spring Security
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // ModelMapper bean for object mapping (e.g., DTO to entity conversion)
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}