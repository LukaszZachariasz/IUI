package com.foodorderback.service.implementations;

import com.foodorderback.model.CartItem;
import com.foodorderback.model.ShoppingCart;
import com.foodorderback.repository.ShoppingCartRepository;
import com.foodorderback.service.IShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ShoppingCartService implements IShoppingCartService {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;


    @Override
    public ShoppingCart updateShoppingCart(ShoppingCart shoppingCart) {
        BigDecimal cartTotal = BigDecimal.ZERO;

        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

        for (CartItem cartItem : cartItemList) {
            cartItemService.updateCartItem(cartItem);
            cartTotal = cartTotal.add(cartItem.getSubtotal());
        }

        shoppingCart.setGrandTotal(cartTotal);
        shoppingCartRepository.save(shoppingCart);

        return shoppingCart;
    }

    @Override
    public void clearShoppingCart(ShoppingCart shoppingCart) {

        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

        for (CartItem cartItem : cartItemList) {
            cartItem.setShoppingCart(null);
            cartItemService.save(cartItem);
        }

        shoppingCart.setGrandTotal(BigDecimal.ZERO);
        shoppingCartRepository.save(shoppingCart);
    }
}
