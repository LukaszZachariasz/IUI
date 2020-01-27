package com.foodorderback.repository;

import com.foodorderback.model.CartItem;
import com.foodorderback.model.ShoppingCart;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CartItemRepository extends CrudRepository<CartItem, Long> {

    List<CartItem> findByShoppingCart(ShoppingCart shoppingCart);

}
