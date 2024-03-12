package com.example.demo.product;

import java.util.HashMap;
import java.util.Map;

class ProductRepository {
    private Long sequece = 0L;
    private Map<Long, Product> persistence = new HashMap<>();

    public void save(Product product) {

        product.assignId(++sequece);
        persistence.put(product.getId(), product);
    }
}
