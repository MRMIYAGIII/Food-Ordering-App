package com.prince.controller;

import com.prince.dto.FoodDTO;
import com.prince.dto.response.ResponseDTO;
import com.prince.model.Food;
import com.prince.model.Restaurant;
import com.prince.service.FoodService;
import com.prince.service.RestaurantService;
import com.prince.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin/foods")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<ResponseDTO<Food>> createFood(
            @RequestBody FoodDTO foodDTO
    ) {

        ResponseDTO<Food> response = new ResponseDTO<>();
        Restaurant restaurant = restaurantService.findById(foodDTO.getRestaurantId());

        Food food = foodService.createFood(foodDTO, foodDTO.getCategory(), restaurant);

        response.setPayload(food);
        response.setMessage("Food Registered Successfully");
        response.setHttpStatus(HttpStatus.CREATED);
        response.setCode("201");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO<Boolean>> deleteFood(@PathVariable Long id) throws Exception {

        ResponseDTO<Boolean> response = new ResponseDTO<>();
        boolean isDeleted = foodService.deleteFood(id);

        response.setPayload(isDeleted);
        response.setMessage("Food Deleted Successfully");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO<Food>> updateFoodAvailabilityStatus(@PathVariable Long id) throws Exception {

        ResponseDTO<Food> response = new ResponseDTO<>();
        Food food = foodService.updateAvailability(id);

        response.setPayload(food);
        response.setMessage("Update Successfully");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }
}
