import axios from "axios";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

export default function RegisterAndEdit({ user }) {
    const { getToken } = useContext(AuthContext)

    const [swalProps, setSwalProps] = useState({})
    const [showSweetAlert, setShowSweetAlert] = useState(false);

    const [name, setName] = useState(user?.name || '');
    const [companyName, setcompanyName] = useState(user?.companyName || '');
    const [vat, setVat] = useState(user?.vat || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [email, setEmail] = useState(user?.email || '')


    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm();
    const navigate = useNavigate();
    console.log(user.userRole);

    async function onFormSubmit(data) {

        if (user._id) {
            await axios.put(`users/${user._id}`, data)
            
            if (user.userRole === 'Client') {
                navigate('/admin/clients');
            } else if (user.userRole === 'Employee') {
                navigate('/admin/employees');
            }

            return;
        }
        if (data.password !== data.rePass) {
            setSwalProps({
                show: true,
                title: 'Passwords do not match!',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#219653',
                icon: 'error'
            });

            return;
        }

        setShowSweetAlert(true);
        const result = await axios.post('users/register', data)
        sessionStorage.setItem("accessToken", result.data.accessToken);
        getToken("accessToken");
        navigate('/');

    }

    const handleSweetAlertClose = () => {
        setShowSweetAlert(false);
        setSwalProps({});
    };

    return (
        <div className="flex flex-col gap-9 py-10 items-center justify-center min-h-screen">

            <div className="w-full max-w-md  rounded-xl border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5">
                    <h3 className="font-medium text-black">
                        {user ? 'Edit a customer' : 'Become a customer'}
                    </h3>
                </div>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="p-6.5">


                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black ">
                                Name <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                {...register("name", { required: true })}
                                onChange={ev => setName(ev.target.value)}
                                placeholder="Enter your full name"
                                className="w-full mb-3 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                            />
                            {errors.name && <span className='bg-danger text-white px-4 py-1 rounded-xl'
                            >Name field is required!</span>}
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black ">
                                Comapny name <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={companyName}
                                {...register("companyName", { required: true })}
                                onChange={ev => setcompanyName(ev.target.value)}
                                placeholder="Enter your company name"
                                className="w-full rounded mb-3 border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                            />
                            {errors.companyName && <span className='bg-danger text-white px-4 py-1 rounded-xl'
                            >Company name field is required!</span>}
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black ">
                                VAT <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={vat}
                                {...register("vat", { required: true })}
                                onChange={ev => setVat(ev.target.value)}
                                placeholder="Enter your VAT number"
                                className="w-full rounded mb-3 border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                            />
                            {errors.vat && <span className='bg-danger text-white px-4 py-1 rounded-xl'
                            >Vat is required!</span>}
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black ">
                                Phone <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={phone}
                                {...register("phone", { required: true })}
                                onChange={ev => setPhone(ev.target.value)}
                                placeholder="Enter your Phone number"
                                className="w-full rounded mb-3 border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                            />
                            {errors.phone && <span className='bg-danger text-white px-4 py-1 rounded-xl'
                            >Phone is required!</span>}
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black ">
                                Address <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={address}
                                {...register("address", { required: true })}
                                onChange={ev => setAddress(ev.target.value)}
                                placeholder="Enter your Address"
                                className="w-full rounded mb-3 border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                            />
                            {errors.address && <span className='bg-danger text-white px-4 py-1 rounded-xl'
                            >Address is required!</span>}
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black ">
                                Email <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                {...register("email", { required: true })}
                                onChange={ev => setEmail(ev.target.value)}
                                placeholder="Enter your email address"
                                className="w-full rounded mb-3 border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                            />
                            {errors.email && <span className='bg-danger text-white px-4 py-1 rounded-xl'
                            >Email is required!</span>}
                        </div>



                        {user ? null : (

                            <>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black ">
                                        Password <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("password", { required: true })}
                                        placeholder="Enter password"
                                        className="w-full rounded mb-3 border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                    />
                                    {errors.password && <span className='bg-danger text-white px-4 py-1 rounded-xl'
                                    >Password field is required!</span>}
                                </div>

                                <div className="mb-5.5">
                                    <label className="mb-2.5 block text-black ">
                                        Re-type Password <span className="text-meta-1">*</span>
                                    </label>

                                    <input
                                        type="password"
                                        {...register("rePass", { required: true })}
                                        placeholder="Re-enter password"
                                        className="w-full rounded mb-3 border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                    />
                                    {errors.rePass && <span className='bg-danger text-white px-4 py-1 rounded-xl'
                                    >Re pass is required!</span>}
                                </div>
                            </>
                        )}

                        <button type="submit" className="flex w-full justify-center rounded bg-black p-3 font-medium text-gray">
                            {user ? 'Edit customer info' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <SweetAlert2 {...swalProps} onConfirm={handleSweetAlertClose} onClose={handleSweetAlertClose}>

                </SweetAlert2>
            </div>
        </div>
    )
}