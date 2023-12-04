import { Link } from "react-router-dom"



export default function TankYouPage() {
    return (
        <div className="min-h-screen flex flex-col items-center align-center justify-center -mt-25">
            <div className="flex flex-col items-center align-center justify-center bg-black p-30 text-white rounded-lg shadow-default">
            <div className="">
                <img className="w-40 mx-auto" src="https://firebasestorage.googleapis.com/v0/b/nextjs-e-commerce-storage.appspot.com/o/fuelImages%2FBG%20PETROL(1).png?alt=media&token=547721da-9a40-417a-8d06-84d293f7d9c3" alt="logo" />
                <h1 className="text-center mt-5 text-title-xl ">Thank you for the order!</h1>
                <h3 className="text-center text-title-lg mt-2">Expect your delivery soon.</h3>

            </div>

            <div className="mt-6">

                <Link className="bg-logo-red py-2 px-2 rounded-lg text-white" to="/">Go to Home Page</Link>
            </div>
            </div>
        </div>

    )

}