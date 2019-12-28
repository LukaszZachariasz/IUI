package com.foodorderback.service;

import com.foodorderback.model.Food;

import java.util.List;
import java.util.Optional;

public interface IFoodService {

    List<Food> findAll();

    Optional<Food> findOne(Long id);

    Food save(Food food);

    List<Food> findByNameContaining(String name);

    void removeOne(Long id);
}
