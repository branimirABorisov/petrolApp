import { Outlet } from "react-router-dom"
import PageFooter from "../components/PageFooter"
import PageHeader from "../components/PageHeader"

export default function PageLayout() {
    return (

        <>
            <PageHeader />
            <main>
                <Outlet />
            </main>
            <PageFooter />
        </>
    )
}


