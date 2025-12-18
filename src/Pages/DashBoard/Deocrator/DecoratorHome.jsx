import { BsThreeDots } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const DashboardStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Earned */}
            <StatCard
                icon={<BiDollar size={28} />}
                value="$4,350"
                label="Earned this month"
            />

            {/* Clients */}
            <StatCard
                icon={<FiUsers size={26} />}
                value="583"
                label="New Clients"
            />

            {/* Sales */}
            <StatCard
                icon={<AiOutlineShoppingCart size={26} />}
                value="1289"
                label="New Sales"
            />

        </div>
    );
};

const StatCard = ({ icon, value, label }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">

            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    {icon}
                </div>

                <div>
                    <h2 className="text-2xl font-bold">55</h2>
                    <p className="text-gray-500 text-sm">Total</p>
                </div>
            </div>

            <BsThreeDots className="text-gray-400 cursor-pointer" />
        </div>
    );
};

export default DashboardStats;
