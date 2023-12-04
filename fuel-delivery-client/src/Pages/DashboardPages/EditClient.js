import { useEffect, useState } from "react"
import RegisterAndEdit from "../../components/RegisterAndEdit"
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditUser () {

    const [client, setClient] = useState(null);
    const {id} = useParams();
    
    useEffect(() =>{
        axios.get(`users/data/${id}`).then(res =>{
            setClient(res.data);
        })

    }, [id])

    return(
        <div className="-mt-10">
            {client && (
            <RegisterAndEdit user={client}/>
            )}
        </div>
    )
}

