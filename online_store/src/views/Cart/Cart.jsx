import React from 'react';
import { useSelector } from 'react-redux';
import SelectedBouquets from '../../components/SelectedBouquets/SelectedBouquets';
import OrderForm from '../../components/OrderForm/OrderForm';
import styles from './cart.module.scss';

function Cart() {
  const { cart } = useSelector((store) => store.mainStore);
  if (!cart.length) {
    return <div>Корзина пуста</div>;
  }
  return (
    <div className={styles.wrapper}>
      <SelectedBouquets />
      <OrderForm />
    </div>
  );
}

export default Cart;
