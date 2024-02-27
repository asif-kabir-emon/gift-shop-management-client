/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { useGetSellInfoQuery } from "../../redux/feature/SaleInfo/sellManagement.api";
import moment from "moment";

const SellHistory = () => {
    const [dateRange, setDateRange] = useState({
        startDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
    });
    const { data: sellHistory, isLoading: isSellHistoryLoading } =
        useGetSellInfoQuery(dateRange, {
            refetchOnMountOrArgChange: true,
        });

    const [totalSell, setTotalSell] = useState(0);
    const [historyType, setHistoryType] = useState("today");

    useEffect(() => {
        if (sellHistory && !isSellHistoryLoading) {
            let total = 0;
            sellHistory.data.forEach((item: any) => {
                total += item.paidAmount;
            });
            setTotalSell(total);
        }
    }, [isSellHistoryLoading, historyType, sellHistory]);

    const handleHistoryType = (type: string) => {
        setHistoryType(type);

        if (type === "today") {
            setDateRange({
                startDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
                endDate: moment().format("YYYY-MM-DD"),
            });
        }
        if (type === "week") {
            setDateRange({
                startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
                endDate: moment().format("YYYY-MM-DD"),
            });
        }
        if (type === "month") {
            setDateRange({
                startDate: moment().subtract(1, "months").format("YYYY-MM-DD"),
                endDate: moment().format("YYYY-MM-DD"),
            });
        }
        if (type === "year") {
            setDateRange({
                startDate: moment().subtract(1, "years").format("YYYY-MM-DD"),
                endDate: moment().format("YYYY-MM-DD"),
            });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="text-center bg-white bg-opacity-40 p-4">
                <h1 className="text-2xl font-bold">Sell History</h1>
            </div>
            <div>
                <div className="flex">
                    <div className="flex flex-row bg-gray-300 rounded-md text-[16px]">
                        <div
                            className={`${historyType == "today" && "bg-[var(--secondary-color)] text-[var(--primary-color)]"} px-3 py-1 rounded-l-md cursor-pointer`}
                            onClick={() => handleHistoryType("today")}
                        >
                            Today
                        </div>
                        <div
                            className={`${historyType == "week" && "bg-[var(--secondary-color)] text-[var(--primary-color)]"} px-3 py-1 cursor-pointer`}
                            onClick={() => handleHistoryType("week")}
                        >
                            Week
                        </div>
                        <div
                            className={`${historyType == "month" && "bg-[var(--secondary-color)] text-[var(--primary-color)]"} px-3 py-1 cursor-pointer`}
                            onClick={() => handleHistoryType("month")}
                        >
                            Month
                        </div>
                        <div
                            className={`${historyType == "year" && "bg-[var(--secondary-color)] text-[var(--primary-color)]"} px-3 py-1 rounded-r-md cursor-pointer`}
                            onClick={() => handleHistoryType("year")}
                        >
                            Year
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <h1 className="text-xl font-bold flex gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                            />
                        </svg>
                        <span>Total Sell</span>
                    </h1>
                    <h1 className="text-xl font-bold">
                        TK. {totalSell.toLocaleString("en-US")}
                    </h1>
                </div>
            </div>
            <div className="bg-white px-3 py-5 rounded overflow-x-auto min-h-[220px]">
                <table className="w-full md:text-lg">
                    <thead>
                        <tr className="bg-black text-white">
                            <th
                                className="px-3 py-2 text-start"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                Item Name
                            </th>
                            <th
                                className="px-3 py-2 text-start"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                Customer Name
                            </th>
                            <th
                                className="px-3 py-2 text-start"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                Quantity
                            </th>
                            <th
                                className="px-3 py-2 text-start"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSellHistoryLoading === false ? (
                            sellHistory.data.length > 0 ? (
                                sellHistory.data.map((item: any) => (
                                    <tr
                                        className="text-start border-[1px] border-l-0 border-r-0 border-gray-200 hover:bg-gray-100"
                                        key={item._id}
                                    >
                                        <td className="px-3 py-1">
                                            {item.productId.name}
                                        </td>
                                        <td className="px-3 py-1">
                                            {item.buyerName}
                                        </td>
                                        <td className="px-3 py-1">
                                            {item.quantity}
                                        </td>
                                        <td className="px-3 py-1">
                                            TK. {item.paidAmount}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="text-center py-[50px]"
                                    >
                                        No data found
                                    </td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center py-[50px]"
                                >
                                    <Spin tip="Loading"></Spin>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellHistory;
