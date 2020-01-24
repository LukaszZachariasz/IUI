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

            //if (dayTimeService.isMorning()) {
            dailySet.add(findBestDishForDayTime(BREAKFAST,
                    user.getDailyTotalKcal() * PERCENTAGE_OF_BREAKFAST));
            //}

            //if (dayTimeService.isNoon()) {
            dailySet.add(findBestDishForDayTime(BREAKFAST,
                    user.getDailyTotalKcal() * PERCENTAGE_OF_DINNER));
            // }

            // if (dayTimeService.isAfterNoon()) {
            dailySet.add(findBestDishForDayTime(BREAKFAST,
                    user.getDailyTotalKcal() * PERCENTAGE_OF_LUNCH));
            //}

            // if (dayTimeService.isEvening()) {
            dailySet.add(findBestDishForDayTime(BREAKFAST,
                    user.getDailyTotalKcal() * PERCENTAGE_OF_SUPPER));
            //}
        }

        return dailySet;
    }

    private Food findBestDishForDayTime(String dish, double bestCaloriesAmount) {

        Long id = 0L;

        ArrayList<Food> allFoodCategory = (ArrayList<Food>) foodRepository.findAllByCategory(dish);

        if (allFoodCategory.size() > 0) {
            id = allFoodCategory.get(0).getId();
        }

        for (Food food : allFoodCategory) {
            //if (food.getKcal() - bestCaloriesAmount)
        }

        return new Food();

    }

    @Override
    public List<Food> getFoodByCategory(Principal principal) {

        User user = userManagementService.findByUsername(principal.getName());
        return new ArrayList<>();
    }

}
