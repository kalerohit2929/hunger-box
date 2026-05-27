'use client'
import { useState } from "react";
// import RestaurantLogin from "../_components/RestaurantLogin";
// import RestaurantSignUp from "../_components/RestaurantSignUp";
// Correct
import RestaurantLogin from "../_components/RestaurantLogin"
import RestaurantSignUp from "../_components/RestaurantSignUp"
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";
import './style.css'

const Restaurant = () => {
    const [login, setLogin] = useState(true)
    return (
        <>
            <div className="min-h-screen flex flex-col bg-[#0D0D0D] text-white">

                <RestaurantHeader />

                <div className="flex-grow flex items-center justify-center px-4 py-10">

                    <div className="w-full max-w-lg bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">

                        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#F4A020] mb-6">
                            Restaurant Login/Signup Page
                        </h1>

                        <div>
                            {login ? <RestaurantLogin /> : <RestaurantSignUp />}
                        </div>

                        <div className="mt-6 text-center">

                            <button
                                className="text-[#F4A020] hover:text-[#FFD166] transition-all text-sm md:text-base"
                                onClick={() => setLogin(!login)}
                            >
                                {
                                    login
                                        ? "Do not have account? SignUp"
                                        : "Already have Account? Login"
                                }
                            </button>

                        </div>

                    </div>

                </div>

                <Footer />

            </div>
        </>
    )
}

export default Restaurant;