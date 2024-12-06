package com.prince.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromAddress;

    // Send reset password email
    @Async
    public void sendResetPasswordEmail(String to, String resetPasswordLink) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

            helper.setFrom("Foody  <" + fromAddress + ">");
            helper.setTo(to);
            helper.setSubject("Password Reset Request");

            // Generate email content dynamically
            String emailContent = "<html>" +
                    "<body>" +
                    "<h2>Password Reset Request</h2>" +
                    "<p>Click the link below to reset your password:</p>" +
                    "<a href=\"" + resetPasswordLink + "\">Reset Password</a>" +
                    "<p>If you did not request this, please ignore this email.</p>" +
                    "</body>" +
                    "</html>";

            helper.setText(emailContent, true); // Enable HTML content

            mailSender.send(mimeMessage);
            log.info("Password reset email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Error sending password reset email", e);
        }
    }
}
