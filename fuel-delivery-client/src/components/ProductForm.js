import { useState } from 'react';
import axios from "axios";
import { ReactSortable } from "react-sortablejs";
import Spinner from './Spinner';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';


export default function ProductForm({
    product
}) {

    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm();

    const [productName, setProductName] = useState(product.productName || '');
    const [price, setPrice] = useState(product.price || '');
    const [images, setImages] = useState(product.images || []);
    const [unit, setUnit] = useState(product.unit || '');
    const [category, setCategory] = useState(product.category || '');
    const [description, setDescription] = useState(product.description || '');
    const [isUploading, setIsUploading] = useState(false);

    const navigate = useNavigate();

    async function handleProduct(data) {

        const fullData = { ...data, images }

        if (!product._id) {

            await axios.post('products', fullData);
        } else {
            await axios.put(`products/${product._id}`, fullData);
        }


        navigate('/admin/products');
    }



    async function uploadImages(e) {
        const files = e.target?.files;

        if (files?.length > 0) {

            setIsUploading(true);

            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/data/upload', data)
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            })

            setIsUploading(false);


        }
    }



    function updateImagesOrder(images) {
        setImages(images);
    }

    return (
        <div className="flex flex-col gap-9">

            <div className="rounded-sm border border-stroke bg-white shadow-default  ">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium text-black ">
                        {product? <h3>Edit product: {product.productName}</h3> : <h3>Create product</h3>} 
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(handleProduct)}>
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black ">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={productName}
                                    {...register("productName", { required: true })}
                                    placeholder="Enter product name"
                                    onChange={ev => setProductName(ev.target.value)}
                                    className="w-full mb-2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                />

                                {errors.productName && <span className='bg-danger text-white px-4 py-1 rounded-xl' >Product name field is required!</span>}
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black ">
                                    Product price
                                </label>
                                <input
                                    type="number"
                                    value={price}
                                    {...register("price", { required: true })}
                                    onChange={ev => setPrice(ev.target.value)}
                                    placeholder="Enter the product price here"
                                    className="w-full mb-2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                />
                                {errors.price && <span className='bg-danger text-white px-4 py-1 rounded-xl' >Price field is required!</span>}
                            </div>
                        </div>

                        <div className="mb-4.5">


                            <label className="mb-3 block text-black ">
                                Upload image
                            </label>

                            <input
                                onChange={uploadImages}
                                type="file"
                                className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                            />
                            <div className='mb-2 flex flex-wrap gap-2 '>
                                <ReactSortable list={images} setList={updateImagesOrder} className="flex  gap-2">
                                    {images.length > 0 && images.map(link => (
                                        <div key={link} className="h-24">
                                            <img src={link} alt="" className="rounded-md w-21 mt-2" />
                                        </div>
                                    ))}
                                </ReactSortable>
                                {isUploading && (
                                    <div className="mb-2 flex flex-wrap gap-2 mt-5">
                                        <Spinner />
                                    </div>
                                )}

                            </div>

                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black ">
                                Unit of measurement (barrel/quantity)
                            </label>
                            <div className="relative z-20 bg-transparent ">
                                <select
                                    value={unit}
                                    {...register("unit", { required: true })}
                                    onChange={ev => setUnit(ev.target.value)}
                                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent mb-2 py-3 px-5 outline-none transition focus:border-primary active:border-primary">
                                    <option value="">Select unit type</option>
                                    <option value="barrel">Barrel</option>
                                    <option value="quantity">Quantity</option>
                                </select>
                                {errors.unit && <span className='bg-danger text-white px-4 py-1 rounded-xl' >Unit is required!</span>}
                                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                    <svg
                                        className="fill-current"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill=""
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black ">
                                Category
                            </label>
                            <div className="relative z-20 bg-transparent ">
                                <select
                                value={category}
                                    {...register("category", { required: true })}

                                    onChange={ev => setCategory(ev.target.value)} className="relative z-20 mb-2 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary">
                                    <option value="">Select category</option>
                                    <option value="fuels">Fuels</option>
                                    <option value="liquids">Liquids</option>
                                    <option value="else">Else</option>
                                </select>
                                {errors.category && <span className='bg-danger text-white px-4 py-1 rounded-xl' >Category is required!</span>}

                                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                    <svg
                                        className="fill-current"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill=""
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block text-black ">
                                Description
                            </label>
                            <textarea
                                {...register("description", { required: true })}
                                rows={6}
                                onChange={ev => setDescription(ev.target.value)}
                                value={description}
                                placeholder="Type your product description"
                                className="w-full mb-2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                            ></textarea>
                            {errors.description && <span className='bg-danger text-white px-4 py-1 rounded-xl' >Description is required!</span>}
                        </div>

                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                            {product ? <button type="button">Edit product</button> : <button type="button">Create product</button>}
                        </button>
                    </div>
                </form>
            </div>
        </div>


    )
}