import axios from "axios";
import { useEffect, useState } from "react";
import AdminProductRow from "./AdminProductRow";


const ProductsTable = () => {

  const [products, setProducts] = useState([]);
  const [isProductDeleted, setIsProductDeleted] = useState(false);

  useEffect(() => {

    axios.get('products').then(res =>{
      setProducts(res)
    })
  }, [isProductDeleted])

  return (
    <>
      {products?.data?.length === 0 && (
        <div className="flex justify-center mt-10 bg-warning text-white items-center font-bold py-2 rounded-lg  shadow-default gap-2 text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>

          No products to be shown! Add your first product now.
        </div>)}


      {products?.data?.length > 0 && (

        <div className="rounded-sm overflow-scroll border border-stroke bg-white shadow-default mt-5">
          <div className="py-6 px-4 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black ">
              Products
            </h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4  sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-center">
              <p className="font-medium">Product Name</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Category</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Price</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Price for</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Actions</p>
            </div>
          </div>
            {products?.data?.map(item => (
              <AdminProductRow key={item._id} product={item} setIsProductDeleted={setIsProductDeleted}/>
            ))}

        </div>
      )}

    </>
  );
};

export default ProductsTable;
