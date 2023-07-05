import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrderListThunk } from '../store/actions/mainActions';

const useOrderList = (id) => {
  const { orderListRequested, orderList } = useSelector((store) => store.mainStore);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!orderListRequested) {
      dispatch(
        getOrderListThunk(),
      );
    }
  }, []);
  return id ? orderList.find((order) => order.id === +id) : orderList;
};

export default useOrderList;
