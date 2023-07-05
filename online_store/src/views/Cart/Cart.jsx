import React from 'react';
import { useSelector } from 'react-redux';
import SelectedBouquets from '../../components/SelectedBouquets/SelectedBouquets';
import OrderForm from '../../components/OrderForm/OrderForm';
import styles from './cart.module.scss';

function Cart() {
  const { cart } = useSelector((store) => store.mainStore);
  if (!cart.length) {
    return (
      <div className={styles.wrapperCart}>
        <div className={styles.containerCart}>Корзина пуста</div>
      </div>
    );
  }
  return (
    <div className={styles.wrapperCart}>
      <div className={styles.containerCart}>
        <SelectedBouquets />
        <OrderForm />
      </div>
    </div>
  );
}

export default Cart;
