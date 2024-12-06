package com.prince.service;

import java.util.List;

import com.prince.model.IngredientCategory;
import com.prince.model.IngredientsItem;

public interface IngredientsService {

   public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;

   public IngredientCategory findIngredientCategoryById(Long id) throws Exception;

   public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception;

   public List<IngredientsItem> findRestaurantIngredients(Long id);

   public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long ingredientCategoryId) throws Exception;

   public IngredientsItem updateStock(Long id) throws Exception;
}
