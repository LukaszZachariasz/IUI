package com.foodorderback.service.implementations;

import com.foodorderback.model.Food;
import com.foodorderback.repository.FoodRepository;
import com.foodorderback.service.IFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodService implements IFoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public List<Food> findAll() {

        List<Food> allFoundedFood = (List<Food>) foodRepository.findAll();
        List<Food> activeFoodList = allFoundedFood
                        .stream()
                        .filter(Food::getActive)
                        .collect(Collectors.toList());

        return activeFoodList;
    }

    @Override
    public Optional<Food> findOne(Long id) {
        return foodRepository.findById(id);
    }

    @Override
    public Food save(Food food) {
        return foodRepository.save(food);
    }

    @Override
    public List<Food> findByNameContaining(String keyword) {
        return foodRepository.findAllByNameContaining(keyword);
    }

    @Override
    public void removeOne(Long id) {
        foodRepository.deleteById(id);
    }
}
