import mainTypes from '../actions/actionTypes';

const initialState = {
  cart: [],
  productList: [],
  productListRequested: false,
  orderList: [],
  orderListRequested: false,
  totalCart: 0,
  filters: {
    minPrice: 0,
    maxPrice: Infinity,
    size: [],
    type: [],
    chocolate: [],
  },
};

function cartSum(cart) {
  return cart.reduce((acc, { itemsprice }) => acc + itemsprice, 0);
}

function mainReducer(state = initialState, action = {}) {
  switch (action.type) {
    case mainTypes.WRITE_PRODUCT_LIST: {
      return { ...state, productList: action.payload };
    }
    case mainTypes.PRODUCT_LIST_REQUESTED: {
      return { ...state, productListRequested: action.payload };
    }
    case mainTypes.WRITE_ORDER_LIST: {
      return { ...state, orderList: action.payload };
    }
    case mainTypes.ORDER_LIST_REQUESTED: {
      return { ...state, orderListRequested: action.payload };
    }
    case mainTypes.ADD_TO_CART: {
      const { cart } = state;
      const orderItem = action.payload;
      let itemFound = false;
      let updatedCart = cart.map((item) => {
        if (item.sku === orderItem.sku
                    && item.berries === orderItem.berries
                    && item.topper === orderItem.topper
        ) {
          itemFound = true;
          return {
            ...item,
            quantity: item.quantity + 1,
            itemsprice: item.price * (item.quantity + 1),
          };
        }
        return item;
      });
      if (!itemFound) {
        let id = 0;
        if (cart.length > 0) {
          id = cart[cart.length - 1].id + 1;
        }
        const newItem = { ...orderItem, id };
        updatedCart = [...updatedCart, newItem];
      }

      return { ...state, cart: updatedCart, totalCart: cartSum(updatedCart) };
    }
    case mainTypes.EMPTY_THE_CART: {
      return {
        ...state,
        cart: [],
        productList: [],
        productListRequested: false,
        totalCart: 0,
        filters: {
          minPrice: 0,
          maxPrice: Infinity,
          size: [],
          type: [],
          chocolate: [],
        },
      };
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
              return {
                ...item,
                quantity: item.quantity - 1,
                itemsprice: item.price * (item.quantity - 1),
              };
            }
          }
          return item;
        })
        .reverse()
        .filter((item) => item.quantity > 0);
      return { ...state, cart: updatedCart, totalCart: cartSum(updatedCart) };
    }
    case mainTypes.SET_FILTER: {
      const { filters } = state;
      const newFilters = action.payload;
      return { ...state, filters: { ...filters, ...newFilters } };
    }
    // case mainTypes.COUNT_CART: {
    //   const { cart } = state;
    //   const orderItem = action.payload;
    //   const updatedCart = cart.map((id) => {
    //     if (orderItem.id === id) {
    //     return { ...state, totalCard: cart.reduce((acc, itemsprice) => {
    //       return acc + itemsprice
    //     }, 0) }
    //   }})
    //  return {...state, cart: updatedCart};
    // }
    default: {
      return state;
    }
  }
}

export default mainReducer;
