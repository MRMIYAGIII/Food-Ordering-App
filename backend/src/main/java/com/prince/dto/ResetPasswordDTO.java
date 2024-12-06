package com.prince.dto;



import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordDTO {
    @NotEmpty(message = "Password should not be empty")
    private String password;

    @NotEmpty(message = "Confirm Password should not be empty")
    private String confirmPassword;
}

