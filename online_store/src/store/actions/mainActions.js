import mainTypes from './actionTypes';

export const doSomethingAC = (data) => ({
  type: mainTypes.DO_SOMETHING,
  payload: data,
});

export const writeProductListAC = (data) => ({
  type: mainTypes.WRITE_PRODUCT_LIST,
  payload: data,
});
export const productListRequestedAC = () => ({
  type: mainTypes.PRODUCT_LIST_REQUESTED,
  payload: true,
});

export const writeOrderListAC = (data) => ({
  type: mainTypes.WRITE_ORDER_LIST,
  payload: data,
});

export const addToCartAC = (data) => ({
  type: mainTypes.ADD_TO_CART,
  payload: data,
});

export const emptyTheCartAC = () => ({
  type: mainTypes.EMPTY_THE_CART,
  payload: true,
});

export const removeFromCartAC = (sku) => ({
  type: mainTypes.REMOVE_FROM_CART,
  payload: sku,
});

export const deleteCartAC = (data) => ({
  type: mainTypes.DELETE_CART,
  payload: data,
});

export const countCartAC = (data) => ({
  type: mainTypes.COUNT_CART,
  payload: data,
});

export const setFilterAC = (data) => ({
  type: mainTypes.SET_FILTER,
  payload: data,
});

export const decreaseCartAC = (data) => ({
  type: mainTypes.DECREASE_CART,
  payload: data,
});

export const getProductListThunk = () => (dispatch) => {
  fetch('https://strawberry.nmsc.pchapl.dev/product')
    .then((data) => data.json())
    .then((result) => {
      dispatch(
        writeProductListAC(result),
      );
    });
  dispatch(
    productListRequestedAC(),
  );
};

export const getOrderListThunk = () => (dispatch) => {
  fetch('https://strawberry.nmsc.pchapl.dev/order')
    .then((data) => data.json())
    .then((result) => {
      dispatch(
        writeOrderListAC(result),
      );
    });
};

export function getDate(datestr) {
  const date = new Date(datestr);
  if (date.isNaN || date.toLocaleDateString() === 'Invalid Date') {
    return '';
  }
  return ` ${date.toLocaleDateString()}`;
}

export function getTopperName(topper) {
  if (topper === 'none') {
    topper = '—';
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

export function getBerryName(berries) {
  if (berries === 'none') {
    berries = '—';
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

export function countNumberOfBouquets(order) {
  const number = order.products.reduce((acc, el) => {
    // eslint-disable-next-line no-param-reassign
    acc += el.count;
    return acc;
  }, 0);
  return number;
}

export const deleteOrder = (id) => async (dispatch) => {
  await fetch(`https://strawberry.nmsc.pchapl.dev/order/${id}`, {
    method: 'DELETE',
  });
  dispatch(getOrderListThunk());
};
