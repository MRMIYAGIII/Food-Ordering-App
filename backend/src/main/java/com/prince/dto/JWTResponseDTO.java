package com.prince.dto;

import com.prince.enums.UserRole;
import lombok.Data;

@Data
public class JWTResponseDTO {

    private String jwt;

    private String email;

    private String userName;

    private UserRole role;
}
