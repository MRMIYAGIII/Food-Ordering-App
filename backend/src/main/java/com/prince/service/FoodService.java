package com.prince.service;

import java.util.List;

import com.prince.dto.FoodDTO;
import com.prince.model.Category;
import com.prince.model.Food;
import com.prince.model.Restaurant;

public interface FoodService {

   public Food createFood(FoodDTO foodDTO, Category category, Restaurant restaurant);

   boolean deleteFood(Long id) throws Exception;

   public List<Food> getAllRestaurantFoods(Long restaurantId, boolean isVegetarian, boolean isNonVeg, boolean isSeasonal, String foodCategory);

   public List<Food> searchFood(String keyword);

   public Food findFoodById(Long id) throws Exception;

   public Food updateAvailability(Long foodId) throws Exception;
}
