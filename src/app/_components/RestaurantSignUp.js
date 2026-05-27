import { useRouter } from "next/navigation";
import { useState } from "react"
import  QuoteBanner from "@/app/_components/QuoteBanner"

const RestaurantSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setC_password] = useState('');
    const [name, setName] = useState('');
    const [city, setcity] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const router = useRouter();
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false)

    const handleSignup = async () => {

        if (password !== c_password) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        if (!email || !password || !c_password || !name || !city || !address || !contact) {
            setError(true);
            return;
        } else {
            setError(false);
        }

        const res = await fetch("/api/restaurant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, name, city, address, contact })
        });

        let response;

        try {
            response = await res.json();
        } catch (err) {
            console.log("Invalid JSON response from server");
            return;
        }

        if (!res.ok) {
            console.log("API error");
            return;
        }

        if (response.success) {
            const { password: _, ...safeUser } = response.result;
            localStorage.setItem("restaurantUser", JSON.stringify(safeUser));
            router.push("/restaurant/dashboard");
        }
    }


        return (
            <>
            <QuoteBanner />
                <h3 className="text-2xl md:text-3xl text-center text-[#F4A020] font-bold mb-6">
                    Signup
                </h3>

                <div className="w-full max-w-md mx-auto px-4">

                    <div className="mb-5 relative">
                        <input
                            type="text"
                            placeholder="Enter email id"
                            className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {
                            error && !email &&
                            <span className="text-[#FF6B6B] text-xs absolute left-0 mt-1">
                                Please enter valid email
                            </span>
                        }
                    </div>

                    <div className="mb-5 relative">
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        {
                            passwordError &&
                            <span className="text-[#FF6B6B] text-xs absolute left-0 mt-1">
                                Password and Confirm password not match
                            </span>
                        }

                        {
                            error && !password &&
                            <span className="text-[#FF6B6B] text-xs absolute left-0 mt-1">
                                Please enter valid password
                            </span>
                        }
                    </div>

                    <div className="mb-5 relative">
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                            value={c_password}
                            onChange={(event) => setC_password(event.target.value)}
                        />

                        {
                            passwordError &&
                            <span className="text-[#FF6B6B] text-xs absolute left-0 mt-1">
                                Password and Confirm password not match
                            </span>
                        }

                        {
                            error && !c_password &&
                            <span className="text-[#FF6B6B] text-xs absolute left-0 mt-1">
                                Please enter valid confirm password
                            </span>
                        }
                    </div>

                    <div className="mb-5 relative">
                        <input
                            type="text"
                            placeholder="Enter restaurant name"
                            className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                        {
                            error && !name &&
                            <span className="text-[#FF6B6B] text-xs absolute left-0 mt-1">
                                Please enter name
                            </span>
                        }
                    </div>

                    <div className="mb-5 relative">
                        <input
                            type="text"
                            placeholder="Enter city"
                            className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                            value={city}
                            onChange={(event) => setcity(event.target.value)}
                        />

                        {
                            error && !city &&
                            <span className="text-[#FF6B6B] text-xs absolute left-0 mt-1">
                                Please enter valid city
                            </span>
                        }
                    </div>

                    <div className="mb-5 relative">
                        <input
                            type="text"
                            placeholder="Enter full address"
                            className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />

                        {
                            error && !address &&
                            <span className="text-[#FF6B6B] text-xs absolute left-0 mt-1">
                                Please enter valid address
                            </span>
                        }
                    </div>

                    <div className="mb-6 relative">
                        <input
                            type="text"
                            placeholder="Enter contact No"
                            className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 text-white outline-none focus:border-[#F4A020]"
                            value={contact}
                            onChange={(event) => setContact(event.target.value)}
                        />

                        {
                            error && !contact &&
                            <span className="text-[#FF6B6B] text-xs absolute left-0 mt-1">
                                Please enter valid contact
                            </span>
                        }
                    </div>

                    <button
                        className="w-full h-11 bg-[#F4A020] text-[#0D0D0D] rounded-lg font-semibold hover:bg-[#FFD166] transition-all"
                        onClick={handleSignup}
                    >
                        Sign up
                    </button>

                </div>
            </>
        )
    }

    export default RestaurantSignUp