import { Outlet } from "react-router-dom";



function ShoppingLayout() {
    return (
        <div className="flex flex-col bg-white overflow-hidden" >
            {/*common header */}
            
            <main className="flex flex-col w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default ShoppingLayout;