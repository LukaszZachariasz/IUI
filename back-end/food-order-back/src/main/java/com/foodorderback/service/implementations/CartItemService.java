package com.foodorderback.service.implementations;

import com.foodorderback.model.*;
import com.foodorderback.repository.CartItemRepository;
import com.foodorderback.repository.FoodToCartItemRepository;
import com.foodorderback.service.ICartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class CartItemService implements ICartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodToCartItemRepository foodToCartItemRepository;


    @Override
    public CartItem addFoodToCartItem(Food food, User user, int qty) {

        List<CartItem> cartItemList = findByShoppingCart(user.getShoppingCart());

        for (CartItem cartItem : cartItemList) {
            if (food.getId() == cartItem.getFood().getId()) {
                cartItem.setQty(cartItem.getQty() + qty);
                cartItem.setSubtotal(new BigDecimal(food.getPrice() * qty));
                cartItemRepository.save(cartItem);
                return cartItem;
            }
        }

        CartItem cartItem = new CartItem();
        cartItem.setShoppingCart(user.getShoppingCart());
        cartItem.setFood(food);
        cartItem.setQty(qty);
        cartItem.setSubtotal(new BigDecimal(food.getPrice() * qty));
        cartItem = cartItemRepository.save(cartItem);
        FoodToCartItem foodToCartItem = new FoodToCartItem();
        foodToCartItem.setFood(food);
        foodToCartItem.setCartItem(cartItem);
        foodToCartItemRepository.save(foodToCartItem);

        return cartItem;
    }

    @Override
    public List<CartItem> findByShoppingCart(ShoppingCart shoppingCart) {
        return cartItemRepository.findByShoppingCart(shoppingCart);
    }

    @Override
    public CartItem updateCartItem(CartItem cartItem) {
        BigDecimal bigDecimal = new BigDecimal(cartItem.getFood().getPrice()).multiply(new BigDecimal(cartItem.getQty()));
        bigDecimal = bigDecimal.setScale(2, RoundingMode.HALF_UP);
        cartItem.setSubtotal(bigDecimal);
        cartItemRepository.save(cartItem);

        return cartItem;
    }

    @Transactional
    @Override
    public void removeCartItem(CartItem cartItem) {
        foodToCartItemRepository.deleteByCartItem(cartItem);
        cartItemRepository.delete(cartItem);
    }

    @Override
    public CartItem findById(Long id) {
        return cartItemRepository.findById(id).get();
    }

    @Override
    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }
}
