package com.foodorderback.controller;

import com.foodorderback.model.Food;
import com.foodorderback.service.implementations.FoodService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public")
public class PublicFoodResourceController {

    private FoodService foodService;

    public PublicFoodResourceController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/getFoodByDayTime")
    public List<Food> getFoodByDayTime() {
        return foodService.getFoodByDayTime();
    }
}
