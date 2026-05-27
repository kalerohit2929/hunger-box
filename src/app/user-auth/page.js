'use client'
import { useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import UserLogin from "../_components/UserLogin"
import UserSignUp from "../_components/UserSignUp"

const UserAuth=(props)=>{
    const [login,setLogin]=useState(true)
    console.log("order flag",props);
    return(
        <>
        <CustomerHeader />
        <div className="min-h-screen flex flex-col bg-[#0D0D0D] text-white">

    <div className="flex-grow flex justify-center items-center px-4 py-10">

        <div className="w-full max-w-lg bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 shadow-lg">

            <h1 className="text-3xl md:text-4xl font-bold text-center text-[#F4A020] mb-8">

                {login ? 'User Login' : 'User Signup'}

            </h1>

            {
                login
                    ? <UserLogin redirect={props.searchParams} />
                    : <UserSignUp redirect={props.searchParams} />
            }

            <button
                className="w-full mt-6 text-[#F4A020] hover:text-[#FFD166] text-sm md:text-base transition-all"
                onClick={() => setLogin(!login)}
            >
                {
                    login
                        ? 'Do not have account? Signup'
                        : 'Already have account ? Login'
                }
            </button>

        </div>

    </div>

    {/* <Footer /> */}

</div>

        <Footer />
        </>
        
            
            
       
    )
}

export default UserAuth