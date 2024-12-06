package com.prince.dto;

import java.util.List;

import com.prince.enums.UserRole;
import com.prince.model.Address;
import com.prince.model.Order;
import com.prince.model.Restaurant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;

    private String fullName;

    private String email;

    private String password;

    private UserRole role;

    private List<Order> orders;

    private List<RestaurantDTO> favorites;

    private List<Address> addresses;

    private Restaurant restaurant;
}
