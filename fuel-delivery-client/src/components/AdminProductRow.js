import axios from "axios";
import { Link } from "react-router-dom"
import { withSwal } from 'react-sweetalert2';




function AdminProductRow ({product, handleClick, setIsProductDeleted }) {


    return(
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4  sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-12.5 w-15 rounded-md">
              <img className="w-12"src={product.images[0]} alt="Product" />
            </div>
            <p className="text-sm text-black ">{product.productName}</p>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm text-black ">{product.category}</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-black ">${product.price}</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-black ">{product.unit}</p>
        </div>
        <div className="col-span-1 flex items-center gap-1">
          <Link to={`/admin/edit/${product._id}`}><button type="button" className="bg-success px-2 py-1 gap-1 rounded-md text-white flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>

            Edit</button></Link>
          <button type="button" onClick={handleClick} className="bg-danger px-2 py-1 gap-1 rounded-md text-white flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>


            Delete</button>
        </div>
      </div>
    )
}


function AdminProductRowWithSwal(props) {
    const { swal, setIsProductDeleted,  ...rest } = props;
    function handleClick() {
      
        swal.fire({
            title: `You want to delete: ${rest.product.productName}`,
            text: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            CancelButtonText: 'Cancel',
            confirmButtonText: 'Yes',
            confirmButtonColor: '#D34053'
        }).then(reslut => {
          const id = rest.product._id
          if (reslut.isConfirmed) {

            axios.delete(`products/${id}`).then(() => {
              setIsProductDeleted(prev => !prev)
            })
          }
        });
    }

    return <AdminProductRow {...rest} handleClick={handleClick} />;
}

export default withSwal(AdminProductRowWithSwal);
