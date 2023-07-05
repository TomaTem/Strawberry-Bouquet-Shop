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
export const orderListRequestedAC = () => ({
  type: mainTypes.ORDER_LIST_REQUESTED,
  payload: true,
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
  dispatch(
    orderListRequestedAC(),
  );
};

export function getDate(datestr) {
  const date = new Date(datestr);
  if (date.isNaN || date.toLocaleDateString() === 'Invalid Date') {
    return '';
  }
  return ` от ${date.toLocaleDateString()}`;
}

export function countNumberOfBouquets(order) {
  const number = order.products.reduce((acc, el) => {
    // eslint-disable-next-line no-param-reassign
    acc += el.count;
    return acc;
  }, 0);
  return number;
}
