package com.prince.service;

import java.util.List;

import com.prince.dto.UserDTO;
import com.prince.model.User;

public interface UserService {
    User registerUser(UserDTO userDTO) throws Exception;  // Change to UserDTO
    User userByToken(String token) throws Exception;
    User userByEmail(String email) throws Exception;
    User updateUser(User user) throws Exception;

    // Add the missing methods here
    List<User> getAllUsers(); // Method to get all users
    void deleteUserByEmail(String email); // Method to delete a user by email
}
