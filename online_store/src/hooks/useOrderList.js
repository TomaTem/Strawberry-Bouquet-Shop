import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrderListThunk } from '../store/actions/mainActions';

const useOrderList = (id) => {
  const { orderList } = useSelector((store) => store.mainStore);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getOrderListThunk(),
    );
  }, []);
  return id ? orderList.find((order) => order.id === +id) : orderList;
};

export default useOrderList;
