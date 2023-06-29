import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './orderCart.module.scss';
import { CloseOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import useProductList from '../../hooks/useProductList';
import { addToCartAC, removeFromCartAC } from '../../store/actions/mainActions';

  function OrderCart({product}) {

    const { price, berries, topper, id, quantity, itemsprice } = product;

    const dispatch = useDispatch(); 

    const increase = (orderItem) => {
        orderItem = {
          id: 0,
          sku: product.sku,
          berries: 'none',
          topper: 'none',
          quantity: 1,
          price: product.price, 
          itemsprice: product.price,
        };
          dispatch(addToCartAC(orderItem));
      }

      const decrease = (orderItem) => {
        orderItem = {
          id: 0,
          sku: product.sku,
          berries: 'none',
          topper: 'none',
          quantity: 1,
          price: product.price, 
          itemsprice: product.price,
        };
        dispatch(removeFromCartAC(orderItem.sku));  
      }

      const deleteCart = () => {
        
      }


  const productData = useProductList(product.sku)

    if (!productData) {
      return <div>loading</div>
      }

    return (
        <>
          <section className={styles.order__wrap}>
          <div className={styles.cart__body}>
            <div className={styles.bouquetPic}>
              <img className={styles.cartPic} 
              src={productData.photos[0]} 
              alt='choicePic' 
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
            <div className={styles.count}>{quantity}</div>
            <div className={styles.control}>
            <button className={styles.button__quantity} onClick={() => increase()}>
              <UpOutlined />
            </button>
            <button className={styles.button__quantity} onClick={() => decrease()}>
              <DownOutlined />
            </button>
            </div>
          </div>
          <div className={styles.price}>{itemsprice}</div>
          <div className={styles.delete}>
            <CloseOutlined
            // onClick={() => deleteCart(id)}/
            />
          </div>      
       </section>
      </>
    );
}

export default OrderCart;