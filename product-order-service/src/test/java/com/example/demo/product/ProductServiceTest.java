package com.example.demo.product;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
public class ProductServiceTest {

    @Autowired
    private ProductService productService;

    @Test
    void 상품조회(){
        // 상품 등록
        productService.addProduct(ProductSteps.상품등록요청_생성());
        final long productId = 1L;

        // 상품 조회
        final GetProductResponse response = productService.getProduct(productId);

        // 응답 검증
        assertThat(response).isNotNull();
    }

}
