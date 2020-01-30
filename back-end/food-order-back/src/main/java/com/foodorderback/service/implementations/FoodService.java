package com.foodorderback.service.implementations;

import com.foodorderback.model.Food;
import com.foodorderback.model.User;
import com.foodorderback.repository.FoodRepository;
import com.foodorderback.service.IFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class FoodService implements IFoodService {

    private static final double PERCENTAGE_OF_BREAKFAST = 0.30d;
    private static final double PERCENTAGE_OF_DINNER = 0.35d;
    private static final double PERCENTAGE_OF_LUNCH = 0.25d;
    private static final double PERCENTAGE_OF_SUPPER = 0.10d;

    private static final String BREAKFAST = "Breakfast";
    private static final String DINNER = "Dinner";
    private static final String LUNCH = "Lunch";
    private static final String SUPPER = "Supper";

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private DayTimeService dayTimeService;

    @Override
    public List<Food> findAll() {
        List<Food> allFoundedFood = (List<Food>) foodRepository.findAll();
        return allFoundedFood
                .stream()
                .filter(Food::getActive)
                .collect(Collectors.toList());
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
        if (dayTimeService.isMorning()) {
            return foodRepository.findAllByCategory(BREAKFAST);
        }
        if (dayTimeService.isNoon()) {
            return foodRepository.findAllByCategory(DINNER);
        }
        if (dayTimeService.isAfterNoon()) {
            return foodRepository.findAllByCategory(LUNCH);
        }
        if (dayTimeService.isEvening()) {
            return foodRepository.findAllByCategory(SUPPER);
        }
        return new ArrayList<>();
    }

    @Override
    public List<Food> getFoodByDayTimeForUserCaloricNeed(Principal principal) {
        User user = userManagementService.findByUsername(principal.getName());
        ArrayList<Food> dailySet = new ArrayList<>();
        if (user.getDailyTotalKcal() != null) {
            dailySet.add(findBestDishForDayTime(BREAKFAST,
                    user.getDailyTotalKcal() * PERCENTAGE_OF_BREAKFAST));
            dailySet.add(findBestDishForDayTime(DINNER,
                    user.getDailyTotalKcal() * PERCENTAGE_OF_DINNER));
            dailySet.add(findBestDishForDayTime(LUNCH,
                    user.getDailyTotalKcal() * PERCENTAGE_OF_LUNCH));
            dailySet.add(findBestDishForDayTime(SUPPER,
                    user.getDailyTotalKcal() * PERCENTAGE_OF_SUPPER));
        }
        return dailySet;
    }


    @Override
    public List<Food> getBestDishByFatContains(Principal principal) {
        User user = userManagementService.findByUsername(principal.getName());
        ArrayList<Food> dailySet = new ArrayList<>();
        if (user.getDailyTotalKcal() != null) {
            if (user.getHealthStatus().equals("HW")) {
                dailySet.add(findLowestFatDish(BREAKFAST));
                dailySet.add(findLowestFatDish(DINNER));
                dailySet.add(findLowestFatDish(LUNCH));
                dailySet.add(findLowestFatDish(SUPPER));
            }
            if (user.getHealthStatus().equals("LW")) {
                dailySet.add(findHighestFatDish(BREAKFAST));
                dailySet.add(findHighestFatDish(DINNER));
                dailySet.add(findHighestFatDish(LUNCH));
                dailySet.add(findHighestFatDish(SUPPER));
            }
            if (user.getHealthStatus().equals("GW")) {
                dailySet.add(findAnyDish(BREAKFAST));
                dailySet.add(findAnyDish(DINNER));
                dailySet.add(findAnyDish(LUNCH));
                dailySet.add(findAnyDish(SUPPER));
            }
        }
        return dailySet;
    }

    private Food findLowestFatDish(String dish) {
        return foodRepository.findTopByCategoryOrderByPercentOfFatDesc(dish);
    }

    private Food findAnyDish(String dish) {
        List<Food> allDishes = foodRepository.findAllByCategory(dish);
        if (allDishes.size() > 0)
            return allDishes.get(new Random().nextInt(allDishes.size()));
        return new Food();
    }

    private Food findHighestFatDish(String dish) {
        return foodRepository.findTopByCategoryOrderByPercentOfFatAsc(dish);
    }

    private Food findBestDishForDayTime(String dish, double bestCaloriesAmount) {
        Food bestDish = new Food();
        ArrayList<Food> allFoodCategory = (ArrayList<Food>) foodRepository.findAllByCategory(dish);
        if (allFoodCategory.size() > 0) {
            bestDish = allFoodCategory.get(0);
            double min = (double) bestDish.getKcal() * (double) (bestDish.getWeight() / 100d);
            double diff = Math.abs(min - bestCaloriesAmount);
            for (Food food : allFoodCategory) {
                double totalFoodEnergy = (double) food.getKcal() * (double) (food.getWeight() / 100d);
                if (Math.abs(totalFoodEnergy - bestCaloriesAmount) < diff) {
                    bestDish = food;
                }
            }
            return bestDish;
        }
        return new Food();
    }
}
