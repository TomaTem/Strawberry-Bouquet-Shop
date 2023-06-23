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

export const addToCartAC = (data) => ({
  type: mainTypes.ADD_TO_CART,
  payload: data,
});

export const deleteCartAC = (data) => ({
  type: mainTypes.DELETE_CART,
  payload: data,
})

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
