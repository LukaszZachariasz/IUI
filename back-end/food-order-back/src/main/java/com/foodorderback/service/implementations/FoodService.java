package com.foodorderback.service.implementations;

import com.foodorderback.model.Food;
import com.foodorderback.model.User;
import com.foodorderback.repository.FoodRepository;
import com.foodorderback.service.IFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodService implements IFoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private UserManagementService userManagementService;

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

    @Override
    public List<Food> getFoodByDayTime() {
        if (LocalDateTime.now().getHour() < 10) {
            return foodRepository.findAllByCategory("Breakfast");
        }

        if (LocalDateTime.now().getHour() >= 10 && LocalDateTime.now().getHour() < 14) {
            return foodRepository.findAllByCategory("Dinner");
        }

        if (LocalDateTime.now().getHour() >= 14 && LocalDateTime.now().getHour() < 17) {
            return foodRepository.findAllByCategory("Lunch");
        }

        if (LocalDateTime.now().getHour() >= 17) {
            return foodRepository.findAllByCategory("Supper");
        }

        return new ArrayList<>();
    }

    @Override
    public List<Food> getFoodByDayTimeForUser(Principal principal) {

        User user = userManagementService.findByUsername(principal.getName());

        return new ArrayList<>();
    }

    @Override
    public List<Food> getFoodByCategory(Principal principal) {

        User user = userManagementService.findByUsername(principal.getName());

        return new ArrayList<>();
    }

}
