import { useParams } from "react-router-dom"
import ProductForm from "../../components/ProductForm"
import { useEffect, useState } from "react";
import axios from "axios";
export default function EditProduct () {

const [productInfo, setProductInfo] = useState(null);


    const {id} = useParams();

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get(`products/${id}`).then(res => {
            setProductInfo(res.data)
        })
    }, [id])

    return (
        <>
        {productInfo && (

            <ProductForm product={productInfo} />
        )}
        </>
    )
}

