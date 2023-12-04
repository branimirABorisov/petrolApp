export default function TotalClientsAdminCard() {
    return (
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-card">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>

            </div>
            <div className="mt-4 flex items-end justify-between">
                <div>
                    <h4 className="text-title-md font-bold text-black">45</h4>
                    <span className="text-sm font-medium">Total clients</span>
                </div>

                <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
                    0.55%
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
                    </svg>

                </span>
            </div>
        </div>
    )
}