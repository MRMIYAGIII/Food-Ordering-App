package com.prince.dto;

import com.prince.model.Address;
import lombok.Data;

@Data
public class OrderDTO {

    private Long restaurantId;
    private Address deliveryAddress;

}
