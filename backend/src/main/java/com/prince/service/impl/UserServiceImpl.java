package com.prince.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.prince.config.JwtProvider;
import com.prince.dto.UserDTO;
import com.prince.exception.UserNotFoundException;
import com.prince.model.Cart;
import com.prince.model.User;
import com.prince.repository.CartRepository;
import com.prince.repository.UserRepository;
import com.prince.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User registerUser(UserDTO userDTO) throws Exception {
        User user = modelMapper.map(userDTO, User.class);
    
        // Check if the user already exists
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            throw new Exception("Email Already Registered");
        }
    
        // Encode the password and save the user
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(userDTO.getRole());
        User savedUser = userRepository.save(user);
    
        // Create a cart for the user
        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepository.save(cart);
    
        return savedUser;
    }
    

    @Override
    public User userByToken(String token) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(token);
        return userRepository.findByEmail(email);
    }

    @Override
    public User userByEmail(String email) throws Exception {
        return userRepository.findByEmail(email);
    }

    @Override
    public User updateUser(User user) throws Exception {
        User existingUser = userRepository.findByEmail(user.getEmail());
        
        if (existingUser == null) {
            throw new Exception("User not found for update.");
        }
    
        // Update allowed fields
        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());  // Assuming email is also being updated
        existingUser.setRole(user.getRole());
    
        // Save the updated user
        return userRepository.save(existingUser);
    }
    

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("User not found with email: " + email);
        }
        userRepository.delete(user);
    }
    
}
