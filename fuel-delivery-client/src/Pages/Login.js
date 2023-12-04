import axios from "axios";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import SweetAlert2 from 'react-sweetalert2';
import {AuthContext} from "../contexts/AuthContext";



export default function Login() {
  const {getToken} = useContext(AuthContext);

  const [swalProps, setSwalProps] = useState({});

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm();

  async function onLogin(data) {

    const result = await axios.post('users/login', data)
    if (result.data.error === 'Incorrect email or password.') {
      setSwalProps({
        show: true,
        title: result.data.error,
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#219653',
        icon: 'error'
      });
      return;
    }
    sessionStorage.setItem("accessToken", result.data.accessToken);
    getToken("accessToken");
    navigate('/');
  }

  const handleSweetAlertClose = () => {
    setSwalProps({});    
  };

  return (

    <div className="flex flex-col gap-1 -mt-15 py-10 items-center justify-center min-h-screen">

      <div className="w-full max-w-md  rounded-xl border border-stroke bg-white shadow-default">
        <div className="border-b border-stroke py-4 px-6.5">
          <h3 className="font-medium text-black">
            Login
          </h3>
        </div>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="p-6.5">


            <div className="mb-4.5">
              <label className="mb-2.5 block text-black ">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email address"
                className="w-full rounded mb-3 border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
              />
              {errors.email && <span className='bg-danger text-white px-4 py-1 rounded-xl'
              >Email is required!</span>}
            </div>

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
              >Password is required!</span>}
            </div>

            <button className="flex w-full justify-center rounded bg-black p-3 font-medium text-gray">
              Login
            </button>
          </div>
        </form>
        <SweetAlert2 {...swalProps} onConfirm={handleSweetAlertClose} onClose={handleSweetAlertClose}>
       
        </SweetAlert2>
      </div>
    </div>


  )
}

