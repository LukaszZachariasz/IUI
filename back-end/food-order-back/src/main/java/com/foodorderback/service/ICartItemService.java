package com.foodorderback.service;

import com.foodorderback.model.*;

import java.util.List;

public interface ICartItemService {

    CartItem addFoodToCartItem(Food food, User user, int qty);

    List<CartItem> findByShoppingCart(ShoppingCart shoppingCart);

    CartItem updateCartItem(CartItem cartItem);

    void removeCartItem(CartItem cartItem);

    CartItem findById(Long id);

    CartItem save(CartItem cartItem);

}
