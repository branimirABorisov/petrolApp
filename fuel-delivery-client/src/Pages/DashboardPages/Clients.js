import axios from "axios";
import { useEffect, useState } from "react"
import UsersRow from "../../components/UsersRow";
import UsersTable from "../../components/UsersTable";



export default function Clients() {

    const [clients, setClients] = useState([]);
    const [isClientDeleted, setIsClientDeleted] = useState(false);
    

    useEffect(() => {
        axios.get(`users/${'Client'}`).then(res => {
            setClients(res.data)
        })
    }, [isClientDeleted])


    return (
        <UsersTable users={clients} setIsUserDeleted={setIsClientDeleted}/>
    )
}
