import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CloseOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import styles from './orderCart.module.scss';
import useProductList from '../../hooks/useProductList';
import {
  addToCartAC,
  decreaseCartAC,
  deleteCartAC,
} from '../../store/actions/mainActions';

function OrderCart({ product }) {
  const { id, quantity, itemsprice } = product;
  const dispatch = useDispatch();
  const increase = (orderItem) => {
    orderItem = {
      id: 0,
      sku: product.sku,
      berries: product.berries,
      topper: product.topper,
      quantity: 1,
      price: product.price,
      itemsprice: product.price,
    };
    dispatch(addToCartAC(orderItem));
  };

  const decrease = () => {
    // orderItem = {
    //   id: 0,
    //   sku: product.sku,
    //   berries: product.berries,
    //   topper: product.topper,
    //   quantity: 1,
    //   price: product.price,
    //   itemsprice: product.price,
    // };
    dispatch(decreaseCartAC(product.id));
  };

  function deleteCart(orderItem) {
    dispatch(deleteCartAC(orderItem));
  }

  function getTopperName(topper) {
    if (topper === 'none') {
      topper = 'без добавок';
    }
    if (topper === 'happy bd') {
      topper = 'Топпер "С Днем Рождения"';
    }
    if (topper === 'love you') {
      topper = 'Топпер "Люблю"';
    }
    if (topper === '8march') {
      topper = 'Топпер "С 8 Марта"';
    }
    if (topper === 'for mom') {
      topper = 'Топпер "Маме"';
    }
    return topper;
  }

  function getBerryName(berries) {
    if (berries === 'none') {
      berries = 'Без ягод';
    }
    if (berries === 'blueberry') {
      berries = 'Голубика';
    }
    if (berries === 'raspberry') {
      berries = 'Малина';
    }
    if (berries === 'mix') {
      berries = 'Голубика + малина';
    }
    return berries;
  }

  const productData = useProductList(product.sku);

  if (!productData) {
    return <div>loading</div>;
  }

  return (
    <section className={styles.order__wrap}>
      <div className={styles.cart__body}>
        <div className={styles.bouquetPic}>
          <img
            className={styles.cartPic}
            src={productData.photos[0]}
            alt="choicePic"
          />
          <div className={styles.bouquetView}>
            <Link to={`/bouquet/${product.sku}`} className={styles.link}>
              {productData.name_title}
            </Link>
            <p className={styles.addings}>
              <p>{productData.description.ingredients}</p>
              <p>{getBerryName(product.berries)}</p>
              <p>{getTopperName(product.topper)}</p>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.quantity}>
        <div className={styles.count}>{quantity}</div>
        <div className={styles.control}>
          <button
            type="button"
            className={styles.button__quantity}
            onClick={() => increase()}
          >
            <UpOutlined />
          </button>
          <button
            type="button"
            className={styles.button__quantity}
            onClick={() => decrease()}
          >
            <DownOutlined />
          </button>
        </div>
      </div>
      <div className={styles.price}>{itemsprice}</div>
      <div className={styles.delete}>
        <CloseOutlined onClick={() => deleteCart(id)} />
      </div>
    </section>
  );
}

export default OrderCart;
