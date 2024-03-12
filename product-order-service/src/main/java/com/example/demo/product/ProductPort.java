package com.example.demo.product;

interface ProductPort {
    void save(Product product);

    Product getProduct(Long productId);
}
