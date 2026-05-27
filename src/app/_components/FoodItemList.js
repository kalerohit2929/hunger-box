import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState();
    const router=useRouter()

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        const restaurantData= JSON.parse(localStorage.getItem('restaurantUser'));
        const resto_id= restaurantData._id;
        let response = await fetch("http://localhost:3000/api/restaurant/foods/"+resto_id);
        response = await response.json();
        if (response.success) {
            setFoodItems(response.result)
        } else {
            alert("food item list not loading")
        }

    }

    const deleteFoodItem=async(id)=>{
        let response = await fetch('http://localhost:3000/api/restaurant/foods/'+id,{
            method:'delete'
        });
        response = await response.json();
        if(response.success){
            loadFoodItems();
        }else{
            alert("food item not deleted")
        }
    }


    return (
        <div className="px-4 md:px-8 py-6">

    <h1 className="text-2xl md:text-3xl font-bold text-[#F4A020] mb-6">
        Food Items
    </h1>

    <div className="overflow-x-auto rounded-xl border border-[#2A2A2A]">

        <table className="w-full min-w-[700px] bg-[#1A1A1A] text-white">

            <thead className="bg-[#2A2A2A] text-[#F4A020]">

                <tr>
                    <td className="p-4">S.N</td>
                    <td className="p-4">Name</td>
                    <td className="p-4">Price</td>
                    <td className="p-4">Description</td>
                    <td className="p-4">Image</td>
                    <td className="p-4">Operations</td>
                </tr>

            </thead>

            <tbody>

                {
                    foodItems && foodItems.map((item, key) => (

                        <tr
                            key={key}
                            className="border-t border-[#2A2A2A] hover:bg-[#2A2A2A] transition-all"
                        >

                            <td className="p-4">{key + 1}</td>

                            <td className="p-4">
                                {item.name}
                            </td>

                            <td className="p-4 text-[#F4A020] font-semibold">
                                ₹{item.price}
                            </td>

                            <td className="p-4 text-[#CCCCCC]">
                                {item.description}
                            </td>

                            <td className="p-4">
                                <img
                                    src={item.img_path}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                            </td>

                            <td className="p-4">

                                <div className="flex gap-2">

                                    <button
                                        onClick={() => deleteFoodItem(item._id)}
                                        className="px-3 py-2 rounded-lg bg-[#F4A020] text-[#0D0D0D] font-semibold hover:bg-[#FFD166] transition-all"
                                    >
                                        Delete
                                    </button>

                                    <button
                                        onClick={() => router.push('dashboard/' + item._id)}
                                        className="px-3 py-2 rounded-lg bg-[#F4A020] text-[#0D0D0D] font-semibold hover:bg-[#FFD166] transition-all"
                                    >
                                        Edit
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))
                }

            </tbody>

        </table>

    </div>

</div>
        )
}

export default FoodItemList;