package com.foodorderback.repository;

import com.foodorderback.model.CartItem;
import com.foodorderback.model.FoodToCartItem;
import org.springframework.data.repository.CrudRepository;

public interface FoodToCartItemRepository extends CrudRepository<FoodToCartItem, Long> {

    void deleteByCartItem(CartItem cartItem);
}
