package com.foodorderback.controller;


import com.foodorderback.model.Food;
import com.foodorderback.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/food")
public class FoodResourceController {

    @Autowired
    private FoodService foodService;

    @PostMapping("/addNew")
    public Food addNewFood(@RequestBody Food food) {
        return foodService.save(food);
    }


}
