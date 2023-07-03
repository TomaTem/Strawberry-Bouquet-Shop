import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import useProductList from '../../hooks/useProductList';

export default function ProductList() {
  const productList = useProductList();
  const {
    filters: {
      minPrice, maxPrice, size, type, chocolate,
    },
  } = useSelector((store) => store.mainStore);
  const filter = (product) => {
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }
    if (size.length && !size.includes(product.size)) {
      return false;
    }
    if (type.length && !type.includes(product.type)) {
      return false;
    }
    if (chocolate.length) {
      const findChoco = product.description.product_details.chocolate
        .some((choco) => chocolate.includes(choco === null ? 'null' : choco));
      if (!findChoco) {
        return false;
      }
    }
    return true;
  };
  return (
    <Row gutter={[16, 16]}>
      {
                productList.filter(filter).map((product) => (
                  <Col
                    key={product.sku}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={6}
                  >
                    <ProductCard
                      product={product}
                    />
                  </Col>

                ))
            }
    </Row>
  );
}
