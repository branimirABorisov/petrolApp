import axios from "axios";
import OrderTableRow from "./OrderTableRow";
import { useState, useEffect } from 'react';

const OrdersTable = () => {

  const [orders, setOrders] = useState([]);
  const [isOrderDeleted, setIsOrderDeleted] = useState(false);


  useEffect(() =>{
    axios.get('orders').then(res => {
      setOrders(res.data);
    })
  }, [isOrderDeleted])
  
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default   sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left ">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black  xl:pl-11">
                Order date
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                Order value
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black ">
                Order status
              </th>
              <th className="py-4 px-4 font-medium text-black ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
              {orders.length > 0 && orders.map(order => (
                <OrderTableRow key={order._id} order={order} setIsOrderDeleted={setIsOrderDeleted} />
              ))}
           

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
