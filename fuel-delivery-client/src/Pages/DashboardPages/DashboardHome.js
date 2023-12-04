import TotalViewAdminCard from "../../components/TotalViewsAdminCard"
import TotalClientsAdminCard from "../../components/TotalClientsAdminCard"
import TotalProductsAdminCard from "../../components/TotalProductsAdminCard"
import TotalProfitAdminCard from "../../components/TotalProfitAdminCard"
import ChartOne from "../../components/ChartOne"
import ChartTwo from "../../components/ChartTwo"


export default function DashboardHome() {
    return (
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <TotalViewAdminCard />
                <TotalProfitAdminCard />
                <TotalProductsAdminCard />
                <TotalClientsAdminCard />
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <ChartOne />
                <ChartTwo />
             
            </div>
        </div>



    )
}