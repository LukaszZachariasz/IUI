package com.foodorderback.controller;

import com.foodorderback.model.CartItem;
import com.foodorderback.model.Food;
import com.foodorderback.model.ShoppingCart;
import com.foodorderback.model.User;
import com.foodorderback.service.implementations.CartItemService;
import com.foodorderback.service.implementations.FoodService;
import com.foodorderback.service.implementations.ShoppingCartService;
import com.foodorderback.service.implementations.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class ShoppingCartResourceController {

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private FoodService foodService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ShoppingCartService shoppingCartService;


    @RequestMapping("/add")
    public ResponseEntity<?> addItem(@RequestBody HashMap<String, String> mapper, Principal principal) {
        String foodId =  mapper.get("id");
        String qty = mapper.get("qty");

        User user = userManagementService.findByUsername(principal.getName());
        Food food = foodService.findOne(Long.parseLong(foodId)).get();

        CartItem cartItem = cartItemService.addFoodToCartItem(food, user, Integer.parseInt(qty));

        return new ResponseEntity<>("Food Added Succesfull!", HttpStatus.OK);

    }

    @RequestMapping("/getCartItemList")
    public List<CartItem> getCartItemList(Principal principal) {
        User user = userManagementService.findByUsername(principal.getName());
        ShoppingCart shoppingCart = user.getShoppingCart();
        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
        shoppingCartService.updateShoppingCart(shoppingCart);

        return cartItemList;
    }


    @RequestMapping("/getShoppingCart")
    public ShoppingCart getShoppingCart(Principal principal) {
        User user = userManagementService.findByUsername(principal.getName());
        ShoppingCart shoppingCart = user.getShoppingCart();
        shoppingCartService.updateShoppingCart(shoppingCart);

        return shoppingCart;
    }

    @RequestMapping("/removeItem")
    public ResponseEntity<?> removeItem(@RequestBody String id) {
        cartItemService.removeCartItem(cartItemService.findById(Long.parseLong(id)));

        return new ResponseEntity<>("Food Removed Succesfull!", HttpStatus.OK);
    }


    @RequestMapping("/updateCartItem")
    public ResponseEntity<?> updateCartItem(@RequestBody HashMap<String, String> mapper) {
        String cartItemId = mapper.get("cartItemId");
        String qty = mapper.get("qty");
        CartItem cartItem = cartItemService.findById(Long.parseLong(cartItemId));
        cartItem.setQty(Integer.parseInt(qty));
        cartItemService.updateCartItem(cartItem);

        return new ResponseEntity<>("Food updated Succesfull!", HttpStatus.OK);
    }

}
