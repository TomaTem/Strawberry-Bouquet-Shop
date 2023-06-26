import mainTypes from '../actions/actionTypes';

const initialState = {
  cart: [],
  productList: [],
  productListRequested: false,
};

function mainReducer(state = initialState, action = {}) {
  switch (action.type) {
    case mainTypes.WRITE_PRODUCT_LIST: {
      return { ...state, productList: action.payload };
    }
    case mainTypes.PRODUCT_LIST_REQUESTED: {
      return { ...state, productListRequested: action.payload };
    }
    case mainTypes.ADD_TO_CART: {
      const { cart } = state;
      const orderItem = action.payload;
      let itemFound = false;
      const updatedCart = cart.map((item) => {
        if (item.sku === orderItem.sku
                    && item.berries === orderItem.berries
                    && item.topper === orderItem.topper
        ) {
          itemFound = true;
          return { ...item, quantity: item.quantity + 1, itemsprice: item.price * (item.quantity + 1)};
        }
        return item;
      });
      if (!itemFound) {
        let id = 0;
        if (cart.length > 0) {
          id = cart[cart.length - 1].id +1;
        }
        const newItem = { ...orderItem, id: id };
        return { ...state, cart: [...updatedCart, newItem] };
      }

      return { ...state, cart: updatedCart };
    }
    case mainTypes.REMOVE_FROM_CART: {
      const { cart } = state;
      const skuFound = action.payload;
      let itemFound = false;
      const updatedCart = cart
        .toReversed()
        .map((item) => {
          if (!itemFound && item.sku === skuFound) {
            itemFound = true;
            if (item.quantity > 0) {
              return { ...item, quantity: item.quantity - 1, itemsprice: item.price * (item.quantity - 1) };
            }
          }
          return item;
        })
        .reverse()
        .filter((item) => item.quantity > 0);
      return { ...state, cart: updatedCart };
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
