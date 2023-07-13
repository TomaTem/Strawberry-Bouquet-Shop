import React from 'react';
import {
  Card, Space, Button, Tooltip, Col, Row, Divider, Carousel,
} from 'antd';
import { CloseOutlined, EditFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useProductList from '../../hooks/useProductList';
import useOrderList from '../../hooks/useOrderList';
import { deleteOrder, getDate, countNumberOfBouquets } from '../../store/actions/mainActions';
import styles from './orderDetails.module.scss';

export default function OrderDetails() {
  const { id } = useParams();
  const productList = useProductList();
  const order = useOrderList(id);
  const dispatch = useDispatch();
  console.log(order);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  function photosOfBouquets(orderInfo) {
    const srcArr = [];
    orderInfo.products.map((el) => {
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
      <Card
        title={(
          <p className={styles.orderTitle}>
            Заказ №
            {' '}
            {order.id}
            {' '}
            от
            {getDate(order.created)}
          </p>
        )}
        key={order.id}
        extra={(
          <>
            <Tooltip title="Редактировать заказ">
              <Button shape="circle" icon={<EditFilled />} id={styles.orderBtnEdit} />
            </Tooltip>
            <Tooltip title="Удалить заказ">
              <Button shape="circle" icon={<CloseOutlined />} id={styles.orderBtnDelete} onClick={() => dispatch(deleteOrder(order.id))} />
            </Tooltip>

          </>

)}
        className={styles.orderCard}
      >
        <Row>
          <Col span={9}>
            <Carousel afterChange={onChange}>
              {photosOfBouquets(order).map((src) => (
                <div className={styles.smallImg} key={src}>
                  <img
                    className={styles.smallImgItself}
                    src={src}
                    alt="Выбранный букет"
                  />
                </div>
              ))}
            </Carousel>
          </Col>
          <Col span={15} className={styles.orderInfo}>
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
              руб.
            </p>
          </Col>
        </Row>
      </Card>
    </Space>
  );
}
