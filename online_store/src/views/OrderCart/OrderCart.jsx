import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import styles from './orderCart.module.scss';
// import {deleteCartAC} from '../../store/actions/mainActions';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import useProductList from '../../hooks/useProductList';

// function OrderCart({product, increase, decrease, count, id}) {
function OrderCart({ product }) {
  const {
    price, berries, topper, id, quantity,
  } = product;

  const [count, setCount] = useState(quantity);
  const [sum, setSum] = useState(price * count);

  // const dispatch = useDispatch();

  // const increase = () => {
  //   dispatch(countCartAC(orderItem));
  // };

  const increase = (id) => {
    if (product.id === id) {
      let newCount = count;
      newCount++;
      const newSum = price * newCount;
      setCount(newCount);
      setSum(newSum);
    }
    return product;
  };

  const decrease = (id) => {
    if (product.id === id) {
      const lowerCount = count - 1 > 1 ? count - 1 : 1;
      const lowerSum = price * lowerCount;
      setCount(lowerCount);
      setSum(lowerSum);
    }
    return product;
  };

  const productData = useProductList(product.sku);
  console.log(productData, product);

  // const {id} = useParams();
  // const dispatch = useDispatch();
  // const deleteCart = (id) => {
  //     dispatch(deleteCartAC(id))
  //     console.log('delete', id)
  // }

  if (!productData) {
    return <div>loading</div>;
  }

  return (
    <section className={styles.order__wrap}>
      <div className={styles.cart__body}>
        <div className={styles.bouquetPic}>
          <img
            className={styles.cartPic}
              // src=''
            src={productData.photos[0]}
            alt="choicePic"
          />
          <div className={styles.bouquetView}>
            <Link to={`/bouquet/${product.sku}`} className={styles.link}>
              {productData.name_title}
            </Link>
            <p className={styles.addings}>
              <p>
                {productData.description.ingredients}
              </p>
              <p>{berries}</p>
              <p>{topper}</p>
            </p>
          </div>
        </div>

      </div>

      <div className={styles.quantity}>
        <div className={styles.count}>{count}</div>
        {/* <input type='text' className={styles.count__input} min='1' value={quantity} onChange={(e) => changeValue(id, +e.target.value)} /> */}
        <div className={styles.control}>
          <button className={styles.button__quantity} onClick={() => increase(id)}>
            <UpOutlined />
          </button>
          <button className={styles.button__quantity} onClick={() => decrease(id)}>
            <DownOutlined />
          </button>
        </div>
      </div>
      <div className="price">{sum}</div>
      <div className="delete">
        <CloseOutlined />
      </div>
    </section>
  );
}

export default OrderCart;
