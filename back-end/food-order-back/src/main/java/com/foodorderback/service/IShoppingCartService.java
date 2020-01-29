package com.foodorderback.service;

import com.foodorderback.model.ShoppingCart;

public interface IShoppingCartService {

    ShoppingCart updateShoppingCart(ShoppingCart shoppingCart);

    void clearShoppingCart(ShoppingCart shoppingCart);
}
