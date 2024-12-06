package com.prince.controller;

import com.prince.dto.CartItemDTO;
import com.prince.dto.response.ResponseDTO;
import com.prince.model.Cart;
import com.prince.model.CartItem;
import com.prince.model.User;
import com.prince.service.CartService;
import com.prince.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;


    @PutMapping("/cart/add")
    public ResponseEntity<ResponseDTO<CartItem>> addItemToCart(
            @RequestBody CartItemDTO cartItemDTO,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        ResponseDTO<CartItem> response = new ResponseDTO<>();
        CartItem cartItem = cartService.addItemToCart(cartItemDTO, jwt);

        response.setPayload(cartItem);
        response.setMessage("Item Added Successfully");
        response.setHttpStatus(HttpStatus.CREATED);
        response.setCode("201");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("/cart-item/update")
    public ResponseEntity<ResponseDTO<CartItem>> updateCartItemQuantity(
            @RequestBody CartItemDTO cartItemDTO,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        ResponseDTO<CartItem> response = new ResponseDTO<>();
        CartItem cartItem = cartService.updateCartItemQuantity(cartItemDTO.getCartItemId(), cartItemDTO.getQuantity());

        response.setPayload(cartItem);
        response.setMessage("Success");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @DeleteMapping("/cart-item/{id}/remove")
    public ResponseEntity<ResponseDTO<Cart>> removeItemFromCart(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        ResponseDTO<Cart> response = new ResponseDTO<>();
        Cart cart = cartService.removeItemFromCart(id, jwt);

        response.setPayload(cart);
        response.setMessage("Remove Item From The Cart");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @PutMapping("/cart/clear")
    public ResponseEntity<ResponseDTO<Cart>> clearCart(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        ResponseDTO<Cart> response = new ResponseDTO<>();
        User user = userService.userByToken(jwt);

        Cart cart = cartService.clearCart(user.getId());

        response.setPayload(cart);
        response.setMessage("Success");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

    @GetMapping("/cart")
    public ResponseEntity<ResponseDTO<Cart>> findUserCart(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        ResponseDTO<Cart> response = new ResponseDTO<>();
        User user = userService.userByToken(jwt);

        Cart cart = cartService.findCartByUserId(user.getId());

        response.setPayload(cart);
        response.setMessage("Success");
        response.setHttpStatus(HttpStatus.OK);
        response.setCode("200");

        return new ResponseEntity<>(response, response.getHttpStatus());
    }

}
