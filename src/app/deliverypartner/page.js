'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {
    const [loginMobile, setLoginMobile] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const router = useRouter();


    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if (delivery) {
            router.push('/deliverydashboard')
        }
    }, [])


    const handleSignUp = async () => {
        console.log(name, mobile, password, confirmPassword, city, address);
        let response = await fetch('http://localhost:3000/api/deliverypartners/signup', {
            method: 'post',
            body: JSON.stringify({ name, mobile, password, city, address })
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('deliverydashboard')

        } else {
            alert("failed")
        }
    }

    const loginHandle = async () => {
        let response = await fetch('http://localhost:3000/api/deliverypartners/login', {
            method: 'post',
            body: JSON.stringify({ mobile: loginMobile, password: loginPassword })
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('deliverydashboard')

        } else {
            alert("failed to login. Please try again with valid mobile and password")
        }
    }

    return (
       <>
       <DeliveryHeader/>
        <div className="px-4 md:px-8 py-6">
            

            <h1 className="text-3xl md:text-4xl font-bold text-center text-[#F4A020] mb-8">
                Delivery Partner
            </h1>

            <div className="flex flex-col lg:flex-row justify-center gap-8">

                {/* Login */}

                <div className="w-full lg:w-1/2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">

                    <h3 className="text-2xl font-semibold text-[#F4A020] text-center mb-6">
                        Login
                    </h3>

                    <div className="mb-5">
                        <input
                            type="text"
                            placeholder="Enter mobile"
                            value={loginMobile}
                            onChange={(event) => setLoginMobile(event.target.value)}
                            className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={loginPassword}
                            onChange={(event) => setLoginPassword(event.target.value)}
                            className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                        />
                    </div>

                    <button
                        onClick={loginHandle}
                        className="w-full h-11 bg-[#F4A020] text-[#0D0D0D] rounded-lg font-semibold hover:bg-[#FFD166] transition-all"
                    >
                        Login
                    </button>

                </div>

                {/* Signup */}

                <div className="w-full lg:w-1/2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">

                    <h3 className="text-2xl font-semibold text-[#F4A020] text-center mb-6">
                        Signup
                    </h3>

                    <div className="space-y-5">

                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter name"
                            className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                        />

                        <input
                            type="text"
                            value={mobile}
                            onChange={(event) => setMobile(event.target.value)}
                            placeholder="Enter mobile"
                            className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter password"
                            className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                        />

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            placeholder="Confirm password"
                            className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                        />

                        <input
                            type="text"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            placeholder="Enter city"
                            className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                        />

                        <input
                            type="text"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            placeholder="Enter address"
                            className="w-full h-11 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                        />

                        <button
                            onClick={handleSignUp}
                            className="w-full h-11 bg-[#F4A020] text-[#0D0D0D] rounded-lg font-semibold hover:bg-[#FFD166] transition-all"
                        >
                            Signup
                        </button>

                    </div>

                </div>

            </div>

        </div>
       
       </>
    )
}

export default Page;