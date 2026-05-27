'use client'
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {

    const userStorage = typeof window !== 'undefined' && localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    const cartStorage = typeof window !== 'undefined' && localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'));
    const [user, setUser] = useState(userStorage ? userStorage : undefined)
    const [cartNumber, setCartNumber] = useState(cartStorage?.length)
    const [cartItem, setCartItem] = useState(cartStorage);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (props.cartData) {
            if (cartNumber) {
                if (cartItem[0].resto_id != props.cartData.resto_id) {
                    localStorage.removeItem('cart');
                    setCartNumber(1);
                    setCartItem([props.cartData])
                    localStorage.setItem('cart', JSON.stringify([props.cartData]))
                } else {
                    let localCartItem = cartItem;
                    localCartItem.push(JSON.parse(JSON.stringify(props.cartData)))
                    setCartItem(localCartItem);
                    setCartNumber(cartNumber + 1)
                    localStorage.setItem('cart', JSON.stringify(localCartItem))
                }
            } else {
                setCartNumber(1)
                setCartItem([props.cartData])
                localStorage.setItem('cart', JSON.stringify([props.cartData]))
            }
        }
    }, [props.cartData])

    useEffect(() => {
        if (props.removeCartData) {
            let localCartItem = cartItem.filter((item) => item._id != props.removeCartData);
            setCartItem(localCartItem);
            setCartNumber(cartNumber - 1);
            localStorage.setItem('cart', JSON.stringify(localCartItem))
            if (localCartItem.length == 0) localStorage.removeItem('cart')
        }
    }, [props.removeCartData])

    useEffect(() => {
        if (props.removeCartData) {
            setCartItem([])
            setCartNumber(0);
            localStorage.removeItem('cart');
        }
    }, [props.removeCartData])

    const logout = () => {
        localStorage.removeItem('user');
        router.push('/user-auth')
    }

    const navLinks = (
        <>
            <li>
                <Link onClick={() => setMenuOpen(false)}
                    className="block text-[#CCCCCC] text-base px-4 py-3 rounded-lg hover:text-[#F4A020] hover:bg-[#2A2A2A] transition-all"
                    href="/"
                >
                    Home
                </Link>
            </li>

            {user ? (
                <>
                    <li>
                        <Link onClick={() => setMenuOpen(false)}
                            className="block text-[#CCCCCC] text-base px-4 py-3 rounded-lg hover:text-[#F4A020] hover:bg-[#2A2A2A] transition-all"
                            href="/myprofile"
                        >
                            {user?.name}
                        </Link>
                    </li>
                    <li>
                        <button onClick={() => { logout(); setMenuOpen(false); }}
                            className="block w-full text-left text-[#F4A020] text-base px-4 py-3 rounded-lg hover:bg-[#2A2A2A] transition-all"
                        >
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link onClick={() => setMenuOpen(false)}
                            className="block text-[#CCCCCC] text-base px-4 py-3 rounded-lg hover:text-[#F4A020] hover:bg-[#2A2A2A] transition-all"
                            href="/user-auth"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => setMenuOpen(false)}
                            className="block text-[#CCCCCC] text-base px-4 py-3 rounded-lg hover:text-[#F4A020] hover:bg-[#2A2A2A] transition-all"
                            href="/user-auth"
                        >
                            SignUp
                        </Link>
                    </li>
                </>
            )}

            <li>
                <Link onClick={() => setMenuOpen(false)}
                    className="block text-[#CCCCCC] text-base px-4 py-3 rounded-lg hover:text-[#F4A020] hover:bg-[#2A2A2A] transition-all"
                    href={cartNumber ? "/cart" : "#"}
                >
                    🛒 Cart ({cartNumber ? cartNumber : 0})
                </Link>
            </li>

            <li>
                <Link onClick={() => setMenuOpen(false)}
                    className="block text-[#CCCCCC] text-base px-4 py-3 rounded-lg hover:text-[#F4A020] hover:bg-[#2A2A2A] transition-all"
                    href="/restaurant"
                >
                    Add Restaurant
                </Link>
            </li>

            <li>
                <Link onClick={() => setMenuOpen(false)}
                    className="block text-[#CCCCCC] text-base px-4 py-3 rounded-lg hover:text-[#F4A020] hover:bg-[#2A2A2A] transition-all"
                    href="/deliverypartner"
                >
                    Delivery Partner
                </Link>
            </li>
        </>
    )

    return (
        <div className="bg-[#1A1A1A] border-b border-[#2A2A2A]">

            {/* Top bar */}
            <div className="flex justify-between items-center px-4 md:px-10 py-4">

                {/* Logo */}
                <div className="logo">
                    <img src="/logo1.svg" className="h-[50px] w-auto object-contain" alt="HungerBox Logo" />
                </div>

                {/* Desktop nav */}
                <ul className="hidden md:flex items-center gap-2">
                    {navLinks}
                </ul>

                {/* Hamburger button - mobile only */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-[#2A2A2A] transition-all"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-[#CCCCCC] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-[#CCCCCC] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-[#CCCCCC] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>

            </div>

            {/* Mobile dropdown menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="flex flex-col px-4 pb-4 gap-1 border-t border-[#2A2A2A]">
                    {navLinks}
                </ul>
            </div>

        </div>
    )
}

export default CustomerHeader