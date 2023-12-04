import axios from "axios";
import Cookies from "js-cookie";



export default async function logoutHandler() {
    await axios.get('users/logout');
    sessionStorage.removeItem('accessToken');
    Cookies.remove('user');
}