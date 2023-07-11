/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

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
import { emptyTheCartAC } from '../../store/actions/mainActions';
import styles from './order-form.module.scss';

import { Map, MODES } from './Map';

const { Text, Paragraph } = Typography;

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const defaultCenter = {
  lat: 34.69705133064743,
  lng: 33.09065538465354,
};

// const patternPhone = /^(\d)$/;

function OrderForm() {
  const [center, setCenter] = useState(defaultCenter);
  const [mode, setMode] = useState(MODES.MOVE);
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const dispatch = useDispatch();

  const onPlaceSelect = useCallback(
    (coordinates) => {
      setCenter(coordinates);
    },
    [],
  );

  const {
    ready,
    value,
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log('📍 Coordinates: ', { lat, lng });
      onPlaceSelect({ lat, lng });
    });
  };

  const renderSuggestions = () => data.map((suggestion) => {
    const {
      place_id,
      structured_formatting: { main_text, secondary_text },
    } = suggestion;

    return (
      <li
        key={place_id}
        onClick={handleSelect(suggestion)}
        onKeyDown={handleSelect(suggestion)}
      >
        <strong>{main_text}</strong>
        <small>{secondary_text}</small>
      </li>
    );
  });

  useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [isLoaded, init]);

  const [radio, setRadio] = useState('no');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
    setRadio('no');
    dispatch(emptyTheCartAC());
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setRadio('no');
    dispatch(emptyTheCartAC());
  };

  const { control, handleSubmit, reset } = useForm();
  const { cart } = useSelector((store) => store.mainStore);
  const { totalCart } = useSelector((store) => store.mainStore);

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
    console.log(coordinates);

    setValue(`Координаты: ${coordinates.lat}, ${coordinates.lng}`);
  }, [markers]);

  const clearMarker = useCallback(() => {
    setMarkers([]);
    setMode(MODES.MOVE);
    setValue('');
  }, []);

  let deliveryPrice = 0;

  if (radio === 'yes') {
    deliveryPrice = 500;
  } else {
    deliveryPrice = 0;
  }

  const totalPrice = totalCart + deliveryPrice;

  const onSubmit = (dataForm) => {
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

    const dataFormAll = dataForm;
    dataFormAll.address = value;

    const orderData = {
      products: order,
      dataForm,
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
    //   setIsModalOpen(true);
    //   reset();
    // } else {
    //   console.log('Error');
    // }
    setIsModalOpen(true);
    reset();
  };

  const deliveryNoFunction = () => {
    setCenter(defaultCenter);
    clearMarker();
  };

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
            render={({ field }) => <Input className={styles.inputs} {...field} placeholder="Телефон +357xxxxxxxx" />}
            name="phone"
            type="tel"
            rules={{ required: true }}
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
            name="delivery_date"
            type="date"
            rules={{ required: true }}
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
            render={({ field: { onChange } }) => (
              <Radio.Group
                value={radio}
                className={styles.formRadio}
                onChange={(e) => onChange(e.target.value) && setRadio(e.target.value)}
              >
                <Radio value="no" onChange={() => setValue('')} onClick={deliveryNoFunction} className={styles.formRad}>Самовывоз</Radio>
                <Radio value="yes" className={styles.formRad}>Доставка до дома - 500€</Radio>
              </Radio.Group>
            )}
          />
          {radio === 'yes' ? (
            <div className={styles.inputAddress} ref={ref}>
              <div className={styles.inputsAddress}>
                <input
                  name="address"
                  value={value}
                  disabled={!ready}
                  className={styles.inputs}
                  onChange={handleInput}
                  placeholder="Введите адрес или сделайте отметку на карте"
                />
                {status === 'OK' && <ul className={styles.inputAuto}>{renderSuggestions()}</ul>}
              </div>
              {MODES.SET_MARKER && value === '' ? (
                <button type="button" className={styles.formButtonMarker} onClick={toggleMode}>Поставить отметку</button>
              ) : (
                <button type="button" className={styles.formButtonMarker} onClick={clearMarker}>Удалить отметку</button>
              )}
            </div>
          ) : (
            <div>
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
            </div>
          )}
          <Text
            className={styles.textContainer}
          >
            Если заказ получаете не Вы, заполните также контакты получателя

          </Text>
          <Controller
            render={({ field }) => <Input className={styles.inputs} {...field} placeholder="Имя получателя" />}
            name="recipient_name"
            control={control}
            defaultValue=""
          />
          <Controller
            render={({ field }) => <Input className={styles.inputs} {...field} placeholder="Телефон получателя +357xxxxxxxxх" />}
            name="recipient_phone"
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
          {isLoaded
            ? (
              <div className={styles.map}>
                <Map
                  center={center}
                  mode={mode}
                  markers={markers}
                  onMarkerAdd={onMarkerAdd}
                />
              </div>

            ) : <div className={styles.map}><h2>Loading...</h2></div>}
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
