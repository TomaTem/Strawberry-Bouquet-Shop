import React from 'react';
import {
  Card, Space, Button, Tooltip, Col, Row, Divider,
} from 'antd';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import useProductList from '../../hooks/useProductList';
import styles from './orderList.module.scss';

export default function OrderList() {
  const productList = useProductList();

  const list = [{
    id: 1,
    products: [
      {
        sku: 41186,
        count: 2,
        product_price: 1799,
        product_details: {
          berries: null,
          topping: null,
        },
      },
    ],
    data: {
      name: 'Леся Лесева',
      phone: '89045556677',
      email: 'q@mail.ru',
      date: '15.06.2023',
      time: '15:30',
      delivery: 'доставка курьером',
      address: 'Кипр, улица, дом',
      'recipient-name': '',
      'recipient-phone': '',
      postcard: 'string',
      comment: 'string',
    },
    price: {
      order_price: 3598,
      delivery_price: 499,
      total_price: 4097,
    },
  },

  {
    id: 2,
    products: [
      {
        sku: '23037',
        count: 1,
        product_price: 8689,
        product_details: {
          berries: 'малина',
          topping: 'маме',
        },
      },
      {
        sku: '915593',
        count: 2,
        product_price: 33980,
        product_details: {
          berries: null,
          topping: null,
        },
      },
      {
        sku: '415593',
        count: 1,
        product_price: 1899,
        product_details: {
          berries: null,
          topping: null,
        },
      },
      {
        sku: '41198',
        count: 1,
        product_price: 3199,
        product_details: {
          berries: null,
          topping: null,
        },
      },
    ],
    data: {
      name: 'Симба Симбовский',
      phone: '89023334455',
      email: 's@mail.ru',
      date: '17.06.23',
      time: '08:30',
      delivery: 'самовывоз',
      address: 'Москва, улица, дом',
      'recipient-name': 'Тома',
      'recipient-phone': '89035556677',
      postcard: 'string',
      comment: 'Не обижайте котиков!',
    },
    price: {
      order_price: 42669,
      delivery_price: 450,
      total_price: 43119,
    },
  }];

  function numberOfBouquets(order) {
    const number = order.products.reduce((acc, el) => {
      // eslint-disable-next-line no-param-reassign
      acc += el.count;
      return acc;
    }, 0);
    return number;
  }

  function photosOfBouquets(order) {
    const srcArr = [];
    order.products.map((el) => {
      srcArr.push(productList.find((product) => product.sku === +el.sku).photos[0]);
      return srcArr;
    });
    return srcArr;
  }

  if (!productList.length) {
    return <div>Loading...</div>;
  }
  return (
    <Space
      direction="vertical"
      size="large"
      className={styles.container}
      style={{
        display: 'flex',
      }}
    >
      {list.map((order) => (
        <Card
          title={(
            <Link to={`/orderdetails/${order.id}`}>
              <p className={styles.orderTitle}>
                Заказ №
                {' '}
                {order.id}
                {' '}
                от
                {' '}
                {order.data.date}
              </p>
            </Link>
        )}
          key={order.id}
          extra={(
            <Tooltip title="Удалить заказ">
              <Button shape="circle" icon={<CloseOutlined />} id={styles.orderBtnDelete} />
            </Tooltip>
)}
          className={styles.orderCard}
        >
          <Row>
            <Col span={12}>
              <Space className={styles.orderImg}>
                {photosOfBouquets(order).map((src, i) => (
                  i < 3 && (
                  <div className={styles.smallImg} key={src}>
                    <img
                      className={styles.smallImgItself}
                      src={src}
                      alt="Выбранный букет"
                    />
                  </div>
                  )
                ))}
              </Space>
            </Col>
            <Col span={12} className={styles.orderInfo}>
              <p>
                Заказчик:
                {' '}
                {order.data.name}
              </p>
              <p>
                Тип доставки:
                {' '}
                {order.data.delivery}
              </p>
              <p>
                Адрес доставки/самовывоза:
                {' '}
                {order.data.address}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={24} className={styles.orderPrices}>
              <Divider className={styles.orderDivider} />
              <p>
                Количество букетов:
                {' '}
                {numberOfBouquets(order)}
                {' '}
                шт
              </p>
              <p>
                {' '}
                Общая сумма заказа:
                {' '}
                {order.price.total_price}
                {' '}
                руб.
              </p>
            </Col>
          </Row>
        </Card>
      ))}
    </Space>
  );
}
