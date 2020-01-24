package com.foodorderback.controller;


import com.foodorderback.model.Food;
import com.foodorderback.service.implementations.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/food")
public class FoodResourceController {

    @Autowired
    private FoodService foodService;

    @PostMapping("/addNew")
    public Food addNewFood(@RequestBody Food food) {
        return foodService.save(food);
    }


    @PostMapping("addNew/image")
    public ResponseEntity upload(@RequestParam("id") Long id, HttpServletResponse response, HttpServletRequest request) {
        try {
            Food food = foodService.findOne(id).get();
            MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
            Iterator<String> iterator = multipartHttpServletRequest.getFileNames();
            MultipartFile multipartFile = multipartHttpServletRequest.getFile(iterator.next());
            String imageName = id + ".png";

            Path p = Paths.get("src/main/resources/static/image/food/" + imageName);
            if (Files.exists(p))
                Files.delete(p);

            BufferedOutputStream stream =
                    new BufferedOutputStream(
                            new FileOutputStream(
                                    new File(p.toString())));


            stream.write(multipartFile.getBytes());
            stream.close();

            return new ResponseEntity("Upload Success!", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("Upload failed!", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/foodList")
    public List<Food> getFoodList() {
        return foodService.findAll();
    }

    @GetMapping("/getFoodByDayTime")
    public List<Food> getFoodByDayTime() {
        return foodService.getFoodByDayTime();
    }

    @GetMapping("/getDailyFoodSetCaloricNeeded")
    public List<Food> getDailyFoodSetCaloricNeeded(Principal principal) {
        return foodService.getFoodByDayTimeForUserCaloricNeed(principal);
    }

    @GetMapping("/getFoodByCategory")
    public List<Food> getFoodByCategory(Principal principal) {
        return foodService.getFoodByCategory(principal);
    }


    @RequestMapping("/{id}")
    public Food getOne(@PathVariable("id") Long id) {
        return foodService.findOne(id).get();
    }

    @PostMapping("/update")
    public Food updateFood(@RequestBody Food food) {
        return foodService.save(food);
    }

    @PostMapping("/remove")
    public ResponseEntity removeFood(@RequestBody String id) throws IOException {
        foodService.removeOne(Long.parseLong(id));

        String imageName = id + ".png";

        Path p = Paths.get("src/main/resources/static/image/food/" + imageName);
        if (Files.exists(p))
            Files.delete(p);

        return new ResponseEntity("Remove Done!", HttpStatus.OK);
    }

}
