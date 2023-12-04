import { Link } from "react-router-dom"
import ProductsTable from "../../components/ProductsTable"
export default function Products () {
    return (
        <>
        <Link to="/admin/create" className="bg-black text-white py-2 px-4 rounded-md">Create product</Link>
        <ProductsTable/>
        </>
    )
}

