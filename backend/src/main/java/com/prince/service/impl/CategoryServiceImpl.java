package com.prince.service.impl;

import com.prince.exception.BadRequestException;
import com.prince.model.Category;
import com.prince.model.Restaurant;
import com.prince.repository.CategoryRepository;
import com.prince.service.CategoryService;
import com.prince.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public Category createCategory(String name, Long restaurantId) {

        Restaurant restaurant = restaurantService.findById(restaurantId);

        Category category = new Category();
        category.setName(name);
        category.setRestaurant(restaurant);

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findCategoryByRestaurantId(Long id) throws Exception {
        return categoryRepository.findByRestaurantId(id);
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {

        Optional<Category> optionalCategory = categoryRepository.findById(id);

        if (optionalCategory.isEmpty()) {
            throw new BadRequestException("Category Not Found");
        }

        return optionalCategory.get();
    }
}
