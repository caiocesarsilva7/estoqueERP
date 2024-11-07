package com.sistemaestoque.sistema_estoque.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sistemaestoque.sistema_estoque.entities.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}