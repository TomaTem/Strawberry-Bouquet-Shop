import React from 'react';
import { useSelector } from 'react-redux';
// import useProductList from '../../hooks/useProductList';
import styles from './selectedBouquets.module.scss';
import OrderCart from '../../views/OrderCart/OrderCart';
// import { useParams } from 'react-router-dom';

function SelectedBouquets() {
  const { cart } = useSelector((store) => store.mainStore);
  const { totalCart } = useSelector((store) => store.mainStore);
  console.log(totalCart);

  const products = cart.map((product) => <OrderCart product={product} key={product.id} />);

  // const [total, setTotal] = useState(
  //   cart.reduce((prev, curr) => {
  //     return prev + curr.sum
  //   }, 0)
  // )
  // productList.forEach(el => sum += Number.parseFloat(el.price))

  return (
    <>
      <h1 className={styles.cart__header}>Корзина</h1>
      <div className={styles.table__header}>
        <div>Наименование</div>
        <div>Количество</div>
        <div>Стоимость</div>
      </div>
      <div className={styles.bouquetWrapper}>
        {products}
      </div>
      <div className={styles.table__footer}>
        <div className={styles.sum}>Сумма заказa </div>
        <div className={styles.summary}>
          {totalCart}
          рублей

        </div>
      </div>

    </>
  );
}

export default SelectedBouquets;
