package com.prince.service.impl;

import com.prince.exception.BadRequestException;
import com.prince.model.IngredientCategory;
import com.prince.model.IngredientsItem;
import com.prince.model.Restaurant;
import com.prince.repository.IngredientCategoryRepository;
import com.prince.repository.IngredientsItemRepository;
import com.prince.service.IngredientsService;
import com.prince.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientsServiceImpl implements IngredientsService {

    @Autowired
    private IngredientCategoryRepository ingredientCategoryRepository;

    @Autowired
    private IngredientsItemRepository ingredientsItemRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {

        Restaurant restaurant = restaurantService.findById(restaurantId);

        IngredientCategory ingredientCategory = new IngredientCategory();
        ingredientCategory.setRestaurant(restaurant);
        ingredientCategory.setName(name);

        return ingredientCategoryRepository.save(ingredientCategory);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long id) throws Exception {

        Optional<IngredientCategory> ingredientCategory = ingredientCategoryRepository.findById(id);

        if (ingredientCategory.isEmpty()) {
            throw new BadRequestException("Ingredient Category Not Found");
        }

        return ingredientCategory.get();
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception {

        restaurantService.findById(id);

        return ingredientCategoryRepository.findByRestaurantId(id);
    }

    @Override
    public List<IngredientsItem> findRestaurantIngredients(Long id) {
        return ingredientsItemRepository.findByRestaurantId(id);
    }

    @Override
    public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long ingredientCategoryId) throws Exception {

        Restaurant restaurant = restaurantService.findById(restaurantId);
        IngredientCategory category = findIngredientCategoryById(ingredientCategoryId);

        IngredientsItem item = new IngredientsItem();
        item.setName(ingredientName);
        item.setRestaurant(restaurant);
        item.setIngredientCategory(category);

        IngredientsItem ingredientsItem = ingredientsItemRepository.save(item);
        category.getIngredientsItems().add(ingredientsItem);

        return ingredientsItem;
    }

    @Override
    public IngredientsItem updateStock(Long id) throws Exception {

        Optional<IngredientsItem> ingredientsItemOptional = ingredientsItemRepository.findById(id);

        if (ingredientsItemOptional.isEmpty()) {
            throw new BadRequestException("Ingredient Not Found");
        }

        IngredientsItem ingredientsItem = ingredientsItemOptional.get();
        ingredientsItem.setInStoke(!ingredientsItem.isInStoke());

        return ingredientsItemRepository.save(ingredientsItem);
    }
}
