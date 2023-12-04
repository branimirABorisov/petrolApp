import { useEffect, useState } from "react"
import UsersTable from "../../components/UsersTable";
import axios from "axios";

export default function Employees () {
    
    const [employees, setEmployees] = useState([]);
    const [isEmployeeDeleted, setIsEmployeeDeleted] = useState(false);

    useEffect(() => {
        axios.get(`users/${'Employee'}`).then(res => {
            setEmployees(res.data);
        })
    }, [isEmployeeDeleted])



    return (
        <UsersTable users={employees} setIsUserDeleted={setIsEmployeeDeleted}/>
    )
}