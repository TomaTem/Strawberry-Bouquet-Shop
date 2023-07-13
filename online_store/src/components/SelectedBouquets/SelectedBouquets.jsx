import React from 'react';
import { useSelector } from 'react-redux';
import styles from './selectedBouquets.module.scss';
import OrderCart from '../../views/OrderCart/OrderCart';

function SelectedBouquets() {
  const { cart } = useSelector((store) => store.mainStore);
  const { totalCart } = useSelector((store) => store.mainStore);

  const products = cart.map((product) => <OrderCart product={product} key={product.id} />);

  return (
    <>
      <h1 className={styles.cart__header}>Корзина</h1>
      <div className={styles.table__header}>
        <div>Наименование</div>
        <div>Количество</div>
        <div>Стоимость</div>
      </div>
      <div className={styles.bouquetWrapper}>{products}</div>
      <div className={styles.table__footer}>
        <div className={styles.sum}>Сумма заказa </div>
        <div className={styles.summary}>
          {totalCart}
          {' '}
          у.е.
        </div>
      </div>
    </>
  );
}

export default SelectedBouquets;
