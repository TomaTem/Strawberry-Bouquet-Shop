/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import {
  Input,
  DatePicker,
  Typography,
  Space,
  Select,
  Radio,
  Modal,
} from 'antd';

import { useJsApiLoader } from '@react-google-maps/api';
import styles from './order-form.module.scss';

import PlacesAutocomplete from './Auto';
import { Map, MODES } from './Map';

import useProductList from '../../hooks/useProductList';

const { Text, Paragraph } = Typography;

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const defaultCenter = {
  lat: 34.69705133064743,
  lng: 33.09065538465354,
};

function OrderForm() {
  const [center, setCenter] = useState(defaultCenter);
  const [mode, setMode] = useState(MODES.MOVE);
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const product = useProductList();
  console.log(product[0]);

  const onPlaceSelect = useCallback(
    (coordinates) => {
      setCenter(coordinates);
    },
    [],
  );

  const [radio, setRadio] = useState('no');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { control, handleSubmit, reset } = useForm();
  const { cart } = useSelector((store) => store.mainStore);
  const { totalCart } = useSelector((store) => store.mainStore);

  let deliveryPrice = 0;

  if (radio === 'yes') {
    deliveryPrice = 500;
  } else {
    deliveryPrice = 0;
  }

  const totalPrice = totalCart + deliveryPrice;

  const onSubmit = (data) => {
    const order = cart.reduce((acc, el) => {
      const obj = {
        sku: String(el.sku),
        count: el.quantity,
        product_price: el.price,
        product_details: {
          berries: el.berries,
          topping: el.topper,
        },
      };
      acc.push(obj);
      return acc;
    }, []);

    const orderData = {
      products: order,
      data,
      price: {
        order_price: totalCart,
        delivery_price: deliveryPrice,
        total_price: totalPrice,
      },
    };

    console.log(`Данные на сервер: ${JSON.stringify(orderData)}`);

    // const res = await fetch('https://strawberry.nmsc.pchapl.dev/order', {
    //   method: 'POST',
    //   body: JSON.stringify(orderData),
    // });
    // if (res.status === 200) {
    //   // setIsModalOpen(true);
    // } else {
    //   console.log('Error');
    // }
    setIsModalOpen(true);
    reset();
    setRadio('no');
  };

  const toggleMode = useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        break;
      case MODES.SET_MARKER:
        setMode(MODES.MOVE);
        break;
      default:
        setMode(MODES.MOVE);
    }
    console.log(mode);
  }, [mode]);

  const onMarkerAdd = useCallback((coordinates) => {
    setMarkers([...markers, coordinates]);
  }, [markers]);

  return (
    <div className={styles.orderFormWrapper}>
      <div className={styles.formItemsWrapper}>
        <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={({ field }) => <Input className={styles.inputs} {...field} placeholder="Ваше имя" />}
            name="name"
            rules={{ required: true }}
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => <Input className={styles.inputs} {...field} placeholder="Телефон +357xxxxxxxxх" />}
            name="phone"
            type="phone"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => <Input className={styles.inputs} {...field} placeholder="Ваш e-mail" />}
            name="email"
            type="email"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => (
              <DatePicker
                {...field}
                onChange={(e) => field.onChange(e)}
                selected={field.value}
                placeholder="Выберите дату"
                className={styles.inputs}
              />
            )}
            name="date"
            type="date"
            control={control}
            defaultValue=""
          />
          <Space className={styles.textContainer}>
            <Text className={styles.formTitle}>Интервал доставки</Text>
            <Text>
              На изготовление заказа нам потребуется 3 часа.
              Заказы, оформленные после 18:00, доставляются на следующий день.
            </Text>
          </Space>
          <Controller
            className={styles.orderSelect}
            name="time"
            control={control}
            defaultValue="09:00-11:00"
            render={({ field }) => (
              <Select
                className={styles.inputSelect}
                {...field}
                options={[
                  { value: '09:00-11:00', label: '09:00-11:00' },
                  { value: '11:00-13:00', label: '11:00-13:00' },
                  { value: '13:00-15:00', label: '13:00-15:00' },
                  { value: '15:00-17:00', label: '15:00-17:00' },
                  { value: '17:00-19:00', label: '17:00-19:00' },
                  { value: '19:00-21:00', label: '19:00-21:00' },
                ]}
              />
            )}
          />
          <Space className={styles.textContainer}>
            <Text className={styles.formTitle}>Способ доставки</Text>
          </Space>
          <Controller
            control={control}
            name="delivery"
            defaultValue="no"
            render={({ field: { value, onChange } }) => (
              <Radio.Group
                value={value}
                className={styles.formRadio}
                onChange={(e) => onChange(e.target.value) && setRadio(e.target.value)}
              >
                <Radio value="no" className={styles.formRad}>Самовывоз</Radio>
                <Radio value="yes" className={styles.formRad}>Доставка до квартиры - 500€</Radio>
              </Radio.Group>
            )}
          />
          {radio === 'yes' ? (
            <Controller
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    className={styles.input}
                    placeholder="Введите адрес доставки (можно воспользоваться поиском на карте)"
                  />
                </div>
              )}
              name="address"
              control={control}
              defaultValue=""
            />
          ) : (
            <Controller
              render={() => (
                <Paragraph
                  className={styles.selfDelivery}
                >
                  Самовывоз по адресу: Γεωρ. Α 87, Γερμασόγεια
                </Paragraph>
              )}
              name="address"
              control={control}
              defaultValue=""
            />
          )}
          <Text
            className={styles.textContainer}
          >
            Если заказ получаете не Вы, заполните также контакты получателя

          </Text>
          <Controller
            render={({ field }) => <Input className={styles.inputs} {...field} placeholder="Имя получателя" />}
            name="recipient-name"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => <Input className={styles.inputs} {...field} placeholder="Телефон получателя +357xxxxxxxxх" />}
            name="recipient-phone"
            type="phone"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => <Input className={styles.inputs} {...field} placeholder="Текст открытки" />}
            name="postcard"
            type="text"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => <Input.TextArea className={styles.inputs} {...field} placeholder="Ваш комментарий" />}
            name="comment"
            control={control}
            defaultValue=""
          />
          <div className={styles.formButtonContainer}>
            <div>
              <Text className={styles.formPrice}>Сумма: </Text>
              <Text className={styles.formPrice}>
                {totalPrice}
                {' '}
                €
              </Text>
            </div>
            <button className={styles.formButton} type="submit">Оформить заказ</button>
          </div>
          <Modal
            centered
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Спасибо за заказ!</p>
          </Modal>

        </form>
      </div>
      <div className={styles.formItemsWrapper}>
        <div className={styles.formWrapper}>
          <PlacesAutocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
          <button type="button" onClick={toggleMode}>Выбор места на карте</button>
          {isLoaded
            ? (
              <Map
                center={center}
                mode={mode}
                markers={markers}
                onMarkerAdd={onMarkerAdd}
              />
            ) : <h2>Loading...</h2>}
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
