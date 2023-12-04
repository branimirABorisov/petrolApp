import { Route, Routes } from 'react-router-dom';
import axios from "axios";
import AdminLayout from './layouts/AdminLayout';
import Orders from './Pages/DashboardPages/Orders';
import Products from './Pages/DashboardPages/Products';
import Clients from './Pages/DashboardPages/Clients';
import Employees from './Pages/DashboardPages/Employees';
import Stock from './Pages/DashboardPages/Stock';
import DashboardHome from './Pages/DashboardPages/DashboardHome';
import Create from './Pages/DashboardPages/Create';
import EditProduct from './Pages/DashboardPages/EditProduct';
import HomePage from './Pages/HomePage';
import PageLayout from './layouts/PageLayout';
import ForUS from './Pages/ForUs'
import TodayPrices from './Pages/TodayPrices'
import MakeAnOrder from './Pages/MakeAnOrder';
import Register from './Pages/Register';
import Login from './Pages/Login';
import EditUser from './Pages/DashboardPages/EditClient';
import TankYouPage from './Pages/DashboardPages/ThankYouPage';
import { CartContextProvider } from './contexts/CartContext';
import { AuthContextProvider } from './contexts/AuthContext';

import Cart from './Pages/Cart';
import OrderDetails from './Pages/DashboardPages/OrderDetails';
import AdminGuard from './hooks/AdminGuard';

axios.defaults.baseURL = 'http://localhost:5000/';



function App() {
  
  return (
    <AuthContextProvider>
    <CartContextProvider>
    <Routes>
      <Route path='/' exact element={<PageLayout />} >
        <Route path='/' exact element={<HomePage />} />
        <Route path='/for-us' element={<ForUS />} />
        <Route path='/prices' element={<TodayPrices />} />
        <Route path='/order' element={<MakeAnOrder />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/complete' element={<TankYouPage />} />

      </Route>
      <Route path='/admin' element={<AdminGuard><AdminLayout /></AdminGuard>}>
        <Route index element={<DashboardHome />} />
        <Route path='/admin/orders/details/:id' element={<OrderDetails />} />
        <Route path='/admin/orders' element={<Orders />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/admin/employees' element={<Employees />} />
        <Route path='/admin/clients' element={<Clients />} />
        <Route path='/admin/stock' element={<Stock />} />
        <Route path='/admin/create' element={<Create />} />
        <Route path='/admin/user/edit/:id' element={<EditUser />} />
        <Route path='/admin/edit/:id' element={<EditProduct />} />
      </Route>
    </Routes>
    </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;



