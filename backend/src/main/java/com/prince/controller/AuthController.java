package com.prince.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.prince.dto.ResetPasswordDTO;
import com.prince.dto.UserDTO;
import com.prince.model.User;
import com.prince.service.EmailService;
import com.prince.service.UserService;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Forgot password form submission (returns JSON response)
    @PostMapping("/forgot-password")
    @ResponseBody
    public ResponseEntity<?> forgotPassword(@RequestBody UserDTO userDTO) {
        try {
            User user = userService.userByEmail(userDTO.getEmail());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage("No user found with this email."));
            } else {
                String resetPasswordLink = "http://localhost:3000/reset-password?email=" + user.getEmail();
                emailService.sendResetPasswordEmail(user.getEmail(), resetPasswordLink);
                return ResponseEntity.ok(new ResponseMessage("Check your email to reset your password."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage("Error: " + e.getMessage()));
        }
    }

    // Reset password form submission (returns JSON response)
    @PostMapping("/reset-password")
    @ResponseBody
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO dto,
                                           @RequestParam("email") String email) {
        try {
            if (!dto.getPassword().equals(dto.getConfirmPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage("Passwords do not match!"));
            }

            User user = userService.userByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage("User not found."));
            } else {
                user.setPassword(passwordEncoder.encode(dto.getPassword()));

                userService.updateUser(user); // Update the user using the new method
                return ResponseEntity.ok(new ResponseMessage("Password successfully reset."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage("Error: " + e.getMessage()));
        }
    }

    // GET endpoint for rendering reset password page
    @GetMapping("/reset-password")
    public ResponseEntity<?> getResetPasswordPage(@RequestParam("email") String email) {
        try {
            User user = userService.userByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage("User not found."));
            }
    
            // You can return a response telling the frontend to show the password reset form
            // You could also include the email in the response for frontend validation if necessary
            return ResponseEntity.ok(new ResponseMessage("Please enter your new password."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage("Error: " + e.getMessage()));
        }
    }
    

    

    // Response message object for consistent JSON structure
    public static class ResponseMessage {
        private String message;

        public ResponseMessage(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
