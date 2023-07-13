import React from 'react';
import {
  Card, Space, Button, Tooltip, Col, Row, Divider, Spin,
} from 'antd';
import { Link } from 'react-router-dom';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteOrder, getDate, countNumberOfBouquets } from '../../store/actions/mainActions';
import useProductList from '../../hooks/useProductList';
import useOrderList from '../../hooks/useOrderList';
import styles from './orderList.module.scss';

export default function OrderList() {
  const productList = useProductList();
  const orderList = useOrderList();
  console.log(orderList);
  const dispatch = useDispatch();

  function photosOfBouquets(orderInfo) {
    const srcArr = [];
    orderInfo.products.map((el) => {
      srcArr.push(productList.find((product) => product.sku === +el.sku).photos[0]);
      return srcArr;
    });
    return srcArr;
  }

  if (!productList.length) {
    return (
      <div className={styles.loadContainer}>
        <Spin indicator={(
          <LoadingOutlined
            id={styles.loading}
            spin
          />
        )}
        />
      </div>
    );
  } if (!orderList.length) {
    return <div className={styles.info}>Нет оформленных заказов</div>;
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
                {' '}
                от
                {getDate(order.created)}
              </p>
            </Link>
        )}
          key={order.id}
          extra={(
            <Tooltip title="Удалить заказ">
              <Button shape="circle" icon={<CloseOutlined />} id={styles.orderBtnDelete} onClick={() => dispatch(deleteOrder(order.id))} />
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
                {order.data_form.name}
              </p>
              <p>
                Дата доставки:
                {' '}
                {getDate(order.data_form.delivery_date)}
              </p>
              <p>
                Тип доставки:
                {' '}
                {order.data_form.delivery === 'no' ? 'самовывоз' : 'курьер'}
              </p>
              <p>
                Адрес доставки/самовывоза:
                {' '}
                {order.data_form.delivery === 'no' ? 'Γεωρ. Α 87, Γερμασόγεια' : order.data_form.address}
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
                {order.price.total_price}
                {' '}
                у.е.
              </p>
            </Col>
          </Row>
        </Card>
      ))}
    </Space>
  );
}
