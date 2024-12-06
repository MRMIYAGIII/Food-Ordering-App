package com.prince.service;

import java.util.List;

import com.prince.model.Category;

public interface CategoryService {

    public Category createCategory(String name, Long restaurantId);

    public List<Category> findCategoryByRestaurantId(Long id) throws Exception;

    public Category findCategoryById(Long id) throws Exception;

}
