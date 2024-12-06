package com.prince.service;

import java.util.List;

import com.prince.dto.OrderDTO;
import com.prince.model.Order;
import com.prince.model.User;

public interface OrderService {

    public Order createOrder(OrderDTO orderDTO, User user) throws Exception;

    public Order updateOrder(Long orderId, String orderStatus) throws Exception;

    public boolean canselOrder(Long orderId) throws Exception;

    public List<Order> getUserOrders(Long userId) throws Exception ;

    public List<Order> getRestaurantOrders(Long restaurantId, String orderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;
}
