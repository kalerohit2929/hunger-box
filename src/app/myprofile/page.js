'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const Page = ()=>{

    const [myOrders,setMyOrders]=useState([]);
    useEffect(()=>{
        getMyOrders()
    },[])

    const getMyOrders=async()=>{
        const userStorage= JSON.parse(localStorage.getItem('user'));
        let response = await fetch('http://localhost:3000/api/order?id='+userStorage._id)
         response = await response.json();
         if(response.success){
            setMyOrders(response.result)
         }
    }

    return(
        <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col">

    <CustomerHeader />

    <div className="flex-grow px-4 md:px-10 py-6 space-y-5">

        {
            myOrders.map((item, index) => (

                <div
                    key={index}
                    className="max-w-2xl mx-auto bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 hover:border-[#F4A020] transition-all"
                >

                    <h4 className="text-lg font-semibold text-[#F4A020] mb-2">
                        Name : {item.data.name}
                    </h4>

                    <div className="text-[#CCCCCC] mb-1">
                        Amount :
                        <span className="text-white ml-2">
                            ₹{item.amount}
                        </span>
                    </div>

                    <div className="text-[#CCCCCC] mb-1">
                        Address :
                        <span className="text-white ml-2">
                            {item.data.address}
                        </span>
                    </div>

                    <div className="text-[#CCCCCC]">
                        Status :
                        <span className="text-[#F4A020] ml-2">
                            {item.status}
                        </span>
                    </div>

                </div>

            ))
        }

    </div>

    <Footer />

</div>
    )
}

export default Page;