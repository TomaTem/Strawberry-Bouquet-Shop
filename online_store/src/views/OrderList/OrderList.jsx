import React from 'react';
import {
  Card, Space, Button, Tooltip, Col, Row, Divider,
} from 'antd';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import useProductList from '../../hooks/useProductList';
import useOrderList from '../../hooks/useOrderList';
import { getDate, countNumberOfBouquets } from '../../store/actions/mainActions';
import styles from './orderList.module.scss';

export default function OrderList() {
  const productList = useProductList();
  const orderList = useOrderList();
  console.log(orderList);

  function photosOfBouquets(orderInfo) {
    const srcArr = [];
    orderInfo.products.map((el) => {
      srcArr.push(productList.find((product) => product.sku === +el.sku).photos[0]);
      return srcArr;
    });
    return srcArr;
  }

  if (!orderList.length || !productList.length) {
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
      {orderList.map((order) => (
        <Card
          title={(
            <Link to={`/orderdetails/${order.id}`}>
              <p className={styles.orderTitle}>
                Заказ №
                {' '}
                {order.id}
                {getDate(order.created)}
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
                {order.data.delivery === 'no' ? 'самовывоз' : 'курьер'}
              </p>
              <p>
                Адрес доставки/самовывоза:
                {' '}
                {order.data.delivery === 'no' ? 'Γεωρ. Α 87, Γερμασόγεια' : order.data.address}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={24} className={styles.orderPrices}>
              <Divider className={styles.orderDivider} />
              <p>
                Количество букетов:
                {' '}
                {countNumberOfBouquets(order)}
                {' '}
                шт
              </p>
              <p>
                {' '}
                Общая сумма заказа:
                {' '}
                {/* {order.price.total_price} */}
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
