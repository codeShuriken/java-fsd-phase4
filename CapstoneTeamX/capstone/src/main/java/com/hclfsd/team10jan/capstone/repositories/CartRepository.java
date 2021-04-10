package com.hclfsd.team10jan.capstone.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hclfsd.team10jan.capstone.entities.Cart;

@Repository
public interface CartRepository extends CrudRepository<Cart, Integer> {

}
