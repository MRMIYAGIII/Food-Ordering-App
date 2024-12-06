package com.prince.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prince.config.JwtProvider;
import com.prince.dto.JWTResponseDTO;
import com.prince.dto.UserDTO;
import com.prince.dto.response.ResponseDTO;
import com.prince.model.User;
import com.prince.service.UserService;

@RestController
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthenticationManager authenticationManager;
    @PostMapping("/register")
    public ResponseEntity<ResponseDTO<JWTResponseDTO>> registerUser(@RequestBody UserDTO userDTO) throws Exception {
    
        ResponseDTO<JWTResponseDTO> response = new ResponseDTO<>();
    
        // Directly use the UserDTO
        User registeredUser = userService.registerUser(userDTO);  // Pass the UserDTO here
    
        // Authenticate the user
        Authentication authentication = new UsernamePasswordAuthenticationToken(registeredUser.getEmail(), userDTO.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    
        String jwt = jwtProvider.generateToken(authentication);
    
        JWTResponseDTO jwtResponseDTO = new JWTResponseDTO();
        jwtResponseDTO.setJwt(jwt);
        jwtResponseDTO.setEmail(registeredUser.getEmail());
        jwtResponseDTO.setRole(registeredUser.getRole());
        jwtResponseDTO.setUserName(registeredUser.getFullName());
    
        response.setPayload(jwtResponseDTO);
        response.setMessage("Registered Successfully");
        response.setHttpStatus(HttpStatus.CREATED);
        response.setCode("201");
    
        return new ResponseEntity<>(response, response.getHttpStatus());
    }
    
    

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO<JWTResponseDTO>> loginUser(@RequestBody UserDTO userDTO) throws Exception {
        ResponseDTO<JWTResponseDTO> response = new ResponseDTO<>();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        User user = userService.userByEmail(userDTO.getEmail());

        JWTResponseDTO jwtResponseDTO = new JWTResponseDTO();
        jwtResponseDTO.setJwt(jwt);
        jwtResponseDTO.setEmail(userDTO.getEmail());
        jwtResponseDTO.setUserName(user.getFullName());
        jwtResponseDTO.setRole(user.getRole());

        response.setPayload(jwtResponseDTO);
        response.setMessage("Login Successful");
        response.setCode("200");
        response.setHttpStatus(HttpStatus.OK);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("email/")
    public ResponseEntity<ResponseDTO<UserDTO>> getUserByEmail(@RequestBody String email) throws Exception {
        ResponseDTO<UserDTO> response = new ResponseDTO<>();

        UserDTO userDTO = modelMapper.map(userService.userByEmail(email), UserDTO.class);

        response.setPayload(userDTO);
        response.setMessage("Success");
        response.setCode("200");
        response.setHttpStatus(HttpStatus.OK);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("/profile")
    public ResponseEntity<ResponseDTO<UserDTO>> userByToken(@RequestHeader("Authorization") String token) throws Exception {
        ResponseDTO<UserDTO> response = new ResponseDTO<>();
        UserDTO userDTO = modelMapper.map(userService.userByToken(token), UserDTO.class);

        response.setPayload(userDTO);
        response.setMessage("Success");
        response.setCode("200");
        response.setHttpStatus(HttpStatus.OK);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDTO<List<UserDTO>>> getAllUsers() {
        ResponseDTO<List<UserDTO>> response = new ResponseDTO<>();

        List<User> users = userService.getAllUsers();
        List<UserDTO> userDTOs = users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());

        response.setPayload(userDTOs);
        response.setMessage("Success");
        response.setCode("200");
        response.setHttpStatus(HttpStatus.OK);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<ResponseDTO<Void>> deleteUser(@PathVariable String email) {
        userService.deleteUserByEmail(email);

        ResponseDTO<Void> response = new ResponseDTO<>();
        response.setMessage("User deleted successfully");
        response.setCode("200");
        response.setHttpStatus(HttpStatus.OK);

        return new ResponseEntity<>(response, response.getHttpStatus());
    }
}
