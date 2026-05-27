'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
const RestaurantHeader = () => {
    const [details, setDetails] = useState();
    const pathName = usePathname();
    const router = useRouter();
    useEffect(() => {
        const data = localStorage.getItem("restaurantUser");
        if (!data && pathName == "/restaurant/dashboard") {
            router.push("/restaurant")
        }
        else if (data && pathName == "/restaurant") {
            router.push("/restaurant/dashboard")
        }

        if (data) {
            setDetails(JSON.parse(data));

        }
    }, [])

    const logout = () => {
        localStorage.removeItem("restaurantUser");
        router.push("/restaurant")
    }
    return (
    <div className="flex items-center justify-between bg-[#1A1A1A] px-4 sm:px-6 md:px-10 py-4 border-b border-[#2A2A2A]">

        {/* Left - Logo */}
        <div className="logo flex-shrink-0">
            <img
                src="/logo1.svg"
                className="h-[45px] sm:h-[50px] w-auto object-contain"
                alt="HungerBox Logo"
            />
        </div>

        {/* Right - Navigation */}
        <ul className="flex items-center gap-2 sm:gap-4">

            <li>
                <Link
                    href="/"
                    className="text-[#CCCCCC] text-sm sm:text-base hover:text-[#F4A020] transition-all px-2 sm:px-3 py-2 rounded-lg hover:bg-[#2A2A2A]"
                >
                    Home
                </Link>
            </li>

            {details && details.name ? (
                <>
                    <li>
                        <Link
                            href="/"
                            className="text-[#CCCCCC] text-sm sm:text-base hover:text-[#F4A020] transition-all px-2 sm:px-3 py-2 rounded-lg hover:bg-[#2A2A2A]"
                        >
                            Profile
                        </Link>
                    </li>

                    <li>
                        <button
                            onClick={logout}
                            className="text-[#F4A020] text-sm sm:text-base hover:text-[#FFD166] transition-all px-2 sm:px-3 py-2 rounded-lg hover:bg-[#2A2A2A]"
                        >
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <li>
                    <Link
                        href="/"
                        className="text-[#CCCCCC] text-sm sm:text-base hover:text-[#F4A020] transition-all px-2 sm:px-3 py-2 rounded-lg hover:bg-[#2A2A2A]"
                    >
                        Login/SignUp
                    </Link>
                </li>
            )}

        </ul>

    </div>
)
}

export default RestaurantHeader;