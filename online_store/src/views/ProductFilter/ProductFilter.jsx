import React from 'react';
import {
  Checkbox, Col, Row, Select, Slider,
} from 'antd';
import { useDispatch } from 'react-redux';
import styles from './productfilter.module.scss';
import useProductList from '../../hooks/useProductList';
import { setFilterAC } from '../../store/actions/mainActions';

export default function ProductFilter() {
  const productsList = useProductList();
  const maximumPrice = Math.max(...productsList.map((item) => item.price));
  const dispatch = useDispatch();
  const sizeOptions = [
    {
      label: 'S',
      value: 'S',
    },
    {
      label: 'M',
      value: 'M',
    },
    {
      label: 'L',
      value: 'L',
    },
  ];
  const typeOptions = [
    {
      label: 'Букеты',
      value: 'bouquet',
    },
    {
      label: 'Коробки',
      value: 'box',
    },
    {
      label: 'Корзины',
      value: 'basket',
    },
  ];
  const chocoOptions = [
    {
      label: 'без шоколада',
      value: 'null',
    },
    {
      label: 'молочный',
      value: 'молочный',
    },
    {
      label: 'белый',
      value: 'белый',
    },
    {
      label: 'розовый',
      value: 'розовый',
    },
    {
      label: 'тёмный',
      value: 'тёмный',
    },
  ];
  const handlePriceChange = ([minPrice, maxPrice]) => {
    dispatch(setFilterAC({ minPrice, maxPrice }));
  };
  const handleSizeChange = (value) => {
    dispatch(setFilterAC({ size: value }));
  };
  const handleTypeChange = (value) => {
    dispatch(setFilterAC({ type: value }));
  };
  const handleChocoChanged = (value) => {
    dispatch(setFilterAC({ chocolate: value }));
  };
  return (
    <div className={styles.text}>
      <Row gutter={32}>
        <Col span={6}>
          <h5>цена:</h5>
          {maximumPrice > 0
                        && (
                        <Slider
                          range
                          min={0}
                          max={maximumPrice}
                          defaultValue={[0, maximumPrice]}
                          onAfterChange={handlePriceChange}
                        />
                        )}
        </Col>
        <Col span={6}>
          <h5>размер:</h5>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Please select"
            onChange={handleSizeChange}
            options={sizeOptions}
          />
        </Col>
        <Col span={6}>
          <h5>тип:</h5>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Please select"
            onChange={handleTypeChange}
            options={typeOptions}
          />
        </Col>
        <Col span={6}>
          <h5>шоколад:</h5>
          <Checkbox.Group options={chocoOptions} onChange={handleChocoChanged} />
        </Col>
      </Row>
    </div>
  );
}
