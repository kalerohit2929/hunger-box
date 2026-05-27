"use client"
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import './../style.css'
import AddFoodItems from "@/app/_components/AddFoodItem";
import { useState } from "react";
import FoodItemList from "@/app/_components/FoodItemList";
const Dashboard = () => {
    const [addItem, setAddItem] = useState(false)
    return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">

    <RestaurantHeader />

    <div className="px-4 md:px-8 py-6">

        <div className="flex flex-col sm:flex-row gap-4 mb-6">

            <button
                onClick={() => setAddItem(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#F4A020] text-[#0D0D0D] font-semibold hover:bg-[#FFD166] transition-all"
            >
                Add Food
            </button>

            <button
                onClick={() => setAddItem(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#2A2A2A] text-[#CCCCCC] hover:text-[#F4A020] hover:border-[#F4A020] transition-all"
            >
                Dashboard
            </button>

        </div>

        <div>
            {
                addItem
                    ? <AddFoodItems setAddItem={setAddItem} />
                    : <FoodItemList />
            }
        </div>

    </div>

</div>
    )
}

export default Dashboard;