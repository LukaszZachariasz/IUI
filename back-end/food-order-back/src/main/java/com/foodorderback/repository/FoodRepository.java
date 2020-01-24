package com.foodorderback.repository;

import com.foodorderback.model.Food;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FoodRepository extends CrudRepository<Food, Long> {

    List<Food> findAllByNameContaining(String keyword);

    List<Food> findAllByCategory(String keyword);

}
