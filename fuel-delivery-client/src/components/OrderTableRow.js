import axios from "axios";
import { Link } from "react-router-dom";
import { withSwal } from 'react-sweetalert2';


function OrderTableRow({ order, handleClick, setIsOrderDeleted }) {

    console.log(order);
    let orderTotal = 0;

    order.items.map(item => {
        orderTotal += item.product_data.value;
    })

    function statusColorClass (status) {
        if (status === 'new') {
            return 'bg-warning bg-opacity-10 text-warning  py-1 px-3 text-sm font-medium inline-flex rounded-full';
        } else if (status === 'in progress') {
            return 'bg-meta-5 bg-opacity-10 text-meta-5  py-1 px-3 text-sm font-medium inline-flex rounded-full';
        } else if (status === 'complete') {
            return 'bg-success bg-opacity-10 text-success  py-1 px-3 text-sm font-medium inline-flex rounded-full';
        } else if (status === 'canceled') {
            return 'bg-danger bg-opacity-10 text-danger  py-1 px-3 text-sm font-medium inline-flex rounded-full';
        }
    }


    return (

        <tr className="border-b border-[#eee] py-5 px-3 pl-9  xl:pl-11">
            <td className="py-5 px-10">
                <h5 className="font-medium text-black ">
                    {new Date(order.createdAt).toLocaleString()}
                </h5>
                <p className="text-sm">From: {order.companyName}</p>
            </td>
            <td className="py-5 px-4">
                <p className="text-black ">${orderTotal.toFixed(2)}</p>
            </td>
            <td className="py-5 px-4">
                <p className={` ${statusColorClass(order.orderStatus)}`}>
                    {order.orderStatus}
                </p>
            </td>
            <td className="py-5 px-4">
                <div className="flex gap-1">
                    <Link to={`/admin/orders/details/${order._id}`} ><button className="flex flex-row gap-1 items-center bg-success text-white px-3 py-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit
                    </button></Link>
                    <button onClick={handleClick} className=" flex flex-row gap-1 items-center bg-danger text-white px-3 py-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                    </button>

                </div>
            </td>
        </tr>

    );
}



function OrderTableRowWithSwal (props) {
    const { swal, setIsOrderDeleted,  ...rest } = props;

    function handleClick() {
      
        swal.fire({
            title: `You want to delete:`,
            text: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            CancelButtonText: 'Cancel',
            confirmButtonText: 'Yes',
            confirmButtonColor: '#D34053'
        }).then(reslut => {
          const id = rest.order._id
          if (reslut.isConfirmed) {
            axios.delete(`orders/${id}`).then(() => {
              setIsOrderDeleted(prev => !prev)
            })
          }
        });
    }

    return <OrderTableRow {...rest} handleClick={handleClick} />;


}

export default withSwal(OrderTableRowWithSwal);