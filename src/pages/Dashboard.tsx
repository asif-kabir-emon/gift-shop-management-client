/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Pagination, Table } from "antd";
import moment from "moment";
import { useGetAllInvoicesQuery } from "../redux/feature/Invoice/invoice.api";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [dateRange, setDateRange] = useState({
        startDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
    });
    const [page, setPage] = useState(1);

    const {
        data: invoiceData,
        isLoading,
        isFetching,
    } = useGetAllInvoicesQuery({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        page: page,
    });

    const metaData = invoiceData?.meta;

    const [totalSell, setTotalSell] = useState(0);
    const [historyType, setHistoryType] = useState("today");

    useEffect(() => {
        if (invoiceData && !isLoading && !isFetching) {
            let total = 0;
            invoiceData.data.forEach((item: any) => {
                total += item.totalAmountAfterDiscount;
            });
            setTotalSell(total);
        }
    }, [isLoading, isFetching, historyType, invoiceData]);

    const handleHistoryType = (type: string) => {
        setHistoryType(type);
        setPage(1);

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

    const tableData = invoiceData?.data.map((item: any) => {
        return {
            key: item._id,
            customer: item.buyerName,
            products: item.products,
            price: item.totalAmountAfterDiscount,
        };
    });

    const columns = [
        {
            title: "Invoice No.",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Customer Name",
            dataIndex: "customer",
            key: "customer",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (_text: any, record: any) => (
                <div>
                    {record.products.reduce((acc: any, item: any) => {
                        return acc + item.quantity;
                    }, 0)}
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (_text: any, record: any) => (
                <div>{moment(record.createdAt).format("YYYY-MM-DD")}</div>
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_text: any, record: any) => (
                <div>
                    <Link to={`/products/cart/check-out/invoice/${record.key}`}>
                        <button className="button-primary">View Invoice</button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-4">
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
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
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
                <Table
                    columns={columns}
                    dataSource={tableData}
                    loading={isLoading || isFetching}
                    scroll={{ x: 500 }}
                    pagination={false}
                />
                <Pagination
                    current={page}
                    total={metaData?.total}
                    pageSize={metaData?.limit}
                    onChange={(page) => setPage(page)}
                    className="mt-3 text-center"
                />
            </div>
        </div>
    );
};

export default Dashboard;
