import React from 'react';
import {
  Card, Space, Button, Tooltip, Col, Row, Divider, Carousel,
} from 'antd';
import { CloseOutlined, EditFilled } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useProductList from '../../hooks/useProductList';
import useOrderList from '../../hooks/useOrderList';
import { deleteOrder, getDate, getBerryName, getTopperName, countNumberOfBouquets } from '../../store/actions/mainActions';
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

  function getBouquetName(skuFromOrder) {
    return productList.find((product) => product.sku === +skuFromOrder).name_title;
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
              <Link to="/orderlist">
                <Button shape="circle" icon={<CloseOutlined />} id={styles.orderBtnDelete} onClick={() => dispatch(deleteOrder(order.id))} />
              </Link>
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
              Телефон:
              {' '}
              {order.data_form.phone}
            </p>
            <p>
              {order.data_form.email === '' ? '' : `Email: ${order.data_form.email}`}
            </p>
            <p>
              Дата и время доставки:
              {' '}
              {getDate(order.data_form.delivery_date)}
              ,
              {' '}
              {order.data_form.time}
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
            <div className={styles.recipientInfo}>
              <p>
                {order.data_form.recipient_name === '' ? '' : `Получатель: ${order.data_form.recipient_name}`}
              </p>
              <p>
                {order.data_form.recipient_phone === '' ? '' : `Телефон получателя: ${order.data_form.recipient_phone}`}
              </p>
              <p>
                {order.data_form.postcard === '' ? '' : `Надпись в открытке: ${order.data_form.postcard}`}
              </p>
              <p>
                {order.data_form.comment === '' ? '' : `Коментарий к заказу: ${order.data_form.comment}`}
              </p>
            </div>
          </Col>
        </Row>
        <Divider className={styles.orderDivider} />
        <Row>
          <Col span={2} className={styles.orderedBouquetsInfo}>
            Номер
          </Col>
          <Col span={6} className={styles.orderedBouquetsInfo}>
            Название
          </Col>
          <Col span={4} className={styles.orderedBouquetsInfo}>
            Ягоды
          </Col>
          <Col span={6} className={styles.orderedBouquetsInfo}>
            Топинги
          </Col>
          <Col span={3} className={styles.orderedBouquetsInfo}>
            Количество
          </Col>
          <Col span={3} className={styles.orderedBouquetsInfo}>
            Цена
          </Col>
        </Row>
        {order.products.map((bouquet, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Row key={`${i} + ${bouquet.sku}`}>
            <Col span={2} className={styles.orderedBouquetsInfo}>
              {i + 1}
            </Col>
            <Col span={6} className={styles.orderedBouquetsInfo}>
              {getBouquetName(bouquet.sku)}
            </Col>
            <Col span={4} className={styles.orderedBouquetsInfo}>
              {getBerryName(bouquet.product_details.berries)}
            </Col>
            <Col span={6} className={styles.orderedBouquetsInfo}>
              {getTopperName(bouquet.product_details.topping)}
            </Col>
            <Col span={3} className={styles.orderedBouquetsInfo}>
              {bouquet.count}
              {' '}
              шт.
            </Col>
            <Col span={3} className={styles.orderedBouquetsInfo}>
              {bouquet.product_price}
              {' '}
              у.е
            </Col>
          </Row>
        ))}
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
          </Col>
        </Row>
        <Row>
          <Col span={8} className={styles.orderPrices}>
            Стоимость заказа:
            {' '}
            {order.price.order_price}
            {' '}
            у.е.
          </Col>
          <Col span={8} className={styles.orderPrices}>
            Стоимость доставки:
            {' '}
            {order.price.delivery_price}
            {' '}
            у.е.
          </Col>
          <Col span={8} className={styles.orderPrices}>
            Общая сумма:
            {' '}
            {order.price.total_price}
            {' '}
            у.е.
          </Col>
        </Row>
      </Card>
    </Space>
  );
}
