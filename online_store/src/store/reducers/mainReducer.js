import mainTypes from '../actions/actionTypes';

const initialState = {
  something: {},
  productList: [],
  productListRequested: false,
};

function mainReducer(state = initialState, action = {}) {
  switch (action.type) {
    case mainTypes.DO_SOMETHING: {
      return { ...state, something: action.payload };
    }
    case mainTypes.WRITE_PRODUCT_LIST: {
      return { ...state, productList: action.payload };
    }
    case mainTypes.PRODUCT_LIST_REQUESTED: {
      return { ...state, productListRequested: action.payload };
    }
    default: {
      return state;
    }
  }
}

export function deleteCartReducer(state = initialState, action) {
  switch (action.type) {
    case mainTypes.DELETE_CART: {
      return { ...state, productList: state.productList.filter(el => el.id !==
        action.payload)}
    }
    default: {
      return state;
    }
  }
}

export default mainReducer;
