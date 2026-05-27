import { useRouter } from "next/navigation";
import { useState } from "react";
// import QuoteBanner from "@/app/_components/QuoteBanner"
import  QuoteBanner from "@/app/_components/QuoteBanner"

const RestaurantLogin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            setError(true)
            return false
        } else {
            setError(false)
        }
        let response = await fetch("http://localhost:3000/api/restaurant", {
            method: 'POST',
            body: JSON.stringify({ email, password, login: true })
        });

        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/restaurant/dashboard");
        } else {
            alert("Login failed")
        }


    }

    return <>
        <QuoteBanner />
        <h3 className="text-2xl md:text-3xl text-center text-[#F4A020] font-bold mb-6">
            Login
        </h3>

        <div className="w-full max-w-md mx-auto px-4">

            <div className="mb-5 relative">

                <input
                    className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 text-white text-sm outline-none focus:border-[#F4A020]"
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {error && !email &&
                    <span className="text-[#FF6B6B] text-xs mt-1 absolute left-0">
                        Please enter valid email
                    </span>
                }

            </div>

            <div className="mb-5 relative">

                <input
                    className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 text-white text-sm outline-none focus:border-[#F4A020]"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && !password &&
                    <span className="text-[#FF6B6B] text-xs mt-1 absolute left-0">
                        Please enter valid password
                    </span>
                }

            </div>

            <div>

                <button
                    onClick={handleLogin}
                    className="w-full h-11 bg-[#F4A020] text-[#0D0D0D] rounded-lg font-semibold hover:bg-[#FFD166] transition-all"
                >
                    Login
                </button>

            </div>

        </div>
    </>
}

export default RestaurantLogin;