import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import OrderDetailsProductRow from "../../components/OrderDetailsProductRow";
import { saveAs } from 'file-saver';
import Spinner from '../../components/Spinner';

export default function OrderDetails() {

    const [order, setOrder] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [assignedEmployee, setAssignedEmployee] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [loadingInvoice, setLoadingInvoice] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`orders/${id}`).then(res => {
            setOrder(res.data);
            setAssignedEmployee(res.data?.assignTo)
            setOrderStatus(res.data?.orderStatus)
        })
    }, [id]);

    useEffect(() => {
        axios.get(`users/${'Employee'}`).then(res => {
            setEmployees(res.data);
        })
    }, []);

    let totalPrice = 0;
    order?.items?.map(item => {
        totalPrice += item.product_data.value;
    })


    async function orderUpdate () {
        const dataToUpdate = {
            orderId: order._id,
            assignTo: assignedEmployee,
            orderStatus: orderStatus
        }

        await axios.put(`orders/${order._id}`, dataToUpdate);
        navigate('/admin/orders');
    }
    
    

    async function getInvoice() {
        setLoadingInvoice(true);
        try {
            const res=  await axios.post('create/invoice', order, { responseType: 'blob' });
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'document.pdf');
        } catch (error) {
            console.error('Error generating or fetching invoice:', error);
        }
        setLoadingInvoice(false);

    }


    return (
        <div className=" bg-white p-5 rounded-lg shadow-default">
            <div className="flex justify-between items-center ">
                <div>
                    <h1 className="text-title-lg mb-2">Order Date: {new Date(order.createdAt).toLocaleString()}</h1>
                    <p>Order from: {order.name}</p>
                    <p>Company: {order.companyName}</p>
                </div>
                <div>
                    <button 
                    className="bg-black text-white text-title-lg px-5 py-1 rounded-lg shadow-1" type="button" onClick={getInvoice}
                    >
                    {loadingInvoice ? 'Loading...': 'INVOICE'}
                    
                    </button>
                </div>
            </div>
            <hr className="mt-1 mb-1" />
            <div>
                <h3 className="text-title-lg">Products:</h3>
            
                {order?.items?.map(item => (
                    
                    <OrderDetailsProductRow key={item.product_data.name} product={item}/>
                ))}
        
                <hr className="mt-3 mb-2" />
                <div className="">
                    <h3 className="text-title-lg">Details</h3>
                    <div className="flex flex-col mx-auto gap-2 md:flex-row items-center justify-between">
                    <div className="border-2 w-90 h-70 p-3 mt-3 rounded-md border-meta-2 shadow-default">
                        <h3 className="text-title-sm mb-3 mt-2">Address:</h3>
                        <div className="flex flex-col gap-1">
                            <p>Name: {order.name}</p>
                            <p>Company name: {order.companyName}</p>
                            <p>VAT: {order.vat}</p>
                            <p>Phone: {order.phone}</p>
                            <p>Email: {order.email}</p>
                            <p>Address: {order.address}</p>
                        </div>
                    </div>
                    <div className="border-2 w-90 h-70 p-3 mt-3 rounded-md border-meta-2 shadow-default">
                        <h3 className="text-title-sm mb-3 mt-2">Actions</h3>
                        <div className="flex flex-col gap-1">
                            <div>
                                <h4>Assign to:</h4>
                                <select 
                                value={assignedEmployee}
                                onChange={ev => setAssignedEmployee(ev.target.value)}
                                className="relative z-20 mt-1 w-full  rounded border border-stroke bg-transparent mb-2 py-3 px-5 outline-none transition focus:border-primary active:border-primary">
                                    <option value=''>Selet an employee...</option>
                                    {employees.length > 0 && employees.map(emp => (
                                    <option value={emp._id}>{emp.name}</option>

                                    ))}
                                </select>
                            </div>
                            <div>
                                <h4>Order status:</h4>
                                <select
                                value={orderStatus}
                                onChange={ev => setOrderStatus(ev.target.value)} 
                                className="relative z-20 w-full mt-1  rounded border border-stroke bg-transparent mb-2 py-3 px-5 outline-none transition focus:border-primary active:border-primary">
                                    <option value="">New</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="complete">Complete</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>
                    <div className="border-2 w-90 h-70 p-6 mt-3 rounded-md border-meta-2 shadow-default flex flex-col gap-1 justify-center items-center align-middle">
                        <h3 className="text-title-sm mb-3 mt-2">Order total:</h3>
                        <div className="text-title-xl">
                            <p>Total: ${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="mt-10">
                            <button 
                            onClick={orderUpdate}
                            className="bg-success py-1 px-4 text-title-lg text-white rounded-lg" type="button"
                            >Update order
                            </button>
                        </div>
                        
                    </div>
                    </div>
                  
                </div>


            </div>
        </div>

    )
}