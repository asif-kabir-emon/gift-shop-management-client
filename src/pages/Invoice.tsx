/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import { useGetInvoiceByIdQuery } from "../redux/feature/Invoice/invoice.api";
import { Spin, Table } from "antd";
import moment from "moment";
import generatePDF, { Margin, Resolution } from "react-to-pdf";
import { Link } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/feature/auth/authSlice";
import { TUser } from "../types";

const Invoice = () => {
    const token = useAppSelector(useCurrentToken);
    const user = verifyToken(token || "");

    const params = useParams();
    const {
        data: invoiceData,
        isLoading,
        isFetching,
    } = useGetInvoiceByIdQuery(params.id);

    const tableData =
        invoiceData?.data?.products.map(
            (
                item: {
                    productId: any;
                    productName: any;
                    price: any;
                    quantity: any;
                },
                index: number,
            ) => {
                return {
                    key: index + 1,
                    productId: item.productId,
                    name: item.productName,
                    price: item.price,
                    quantity: item.quantity,
                };
            },
        ) || [];

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Product ID",
            dataIndex: "productId",
            key: "productId",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (_text: any, record: { price: number }) => {
                return (
                    <span className="whitespace-nowrap">
                        &#2547; {record.price}
                    </span>
                );
            },
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (
                _text: any,
                record: { price: number; quantity: number },
            ) => {
                return (
                    <span className="whitespace-nowrap">
                        &#2547; {record.price * record.quantity}
                    </span>
                );
            },
        },
    ];

    const getTargetElement = () =>
        document.getElementById(invoiceData.data._id);
    const downloadPdf = () =>
        generatePDF(getTargetElement, {
            resolution: Resolution.EXTREME,
            page: {
                margin: Margin.MEDIUM,
                format: "A4",
                orientation: "portrait",
            },
            filename: `Invoice_${invoiceData.data._id}.pdf`,
        });

    return (
        <div>
            <div className="bg-[--primary-color] px-7 py-10">
                {!isLoading && !isFetching ? (
                    <div>
                        <div
                            className="border-[1px] p-5 rounded"
                            id={invoiceData.data._id}
                        >
                            <div className="flex justify-center">
                                <h1 className="text-3xl font-bold mb-5">
                                    Invoice
                                </h1>
                            </div>
                            <div className="flex flex-col-reverse md:flex-row justify-between">
                                <div className="my-5 text-[16px]">
                                    <div className="flex gap-2">
                                        <span className="font-bold">
                                            Invoice To:
                                        </span>
                                        <span>
                                            {invoiceData.data.buyerName}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-bold">
                                            Seller Id:
                                        </span>
                                        <span>
                                            {invoiceData.data.sellerId._id}
                                        </span>
                                    </div>
                                </div>
                                <div className="my-5 text-[16px]">
                                    <div className="flex gap-2">
                                        <span className="font-bold">
                                            Invoice No:
                                        </span>
                                        <span>{invoiceData.data._id}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-bold">
                                            Invoice Date:
                                        </span>
                                        <span>
                                            {moment(
                                                invoiceData.data.sellDate,
                                            ).format("DD MMMM, YYYY")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <Table
                                    columns={columns}
                                    dataSource={tableData}
                                    scroll={{ x: 500 }}
                                    pagination={false}
                                />
                            </div>
                            <div className="flex flex-col items-end gap-y-6 my-10">
                                <div className="text-[14px] w-full  md:w-[250px]">
                                    <div className="flex justify-between">
                                        <span className="font-bold">
                                            Total Quantity
                                        </span>
                                        <span>
                                            {
                                                // calculate total quantity
                                                invoiceData.data.products.reduce(
                                                    (
                                                        acc: number,
                                                        item: {
                                                            quantity: number;
                                                        },
                                                    ) => acc + item.quantity,
                                                    0,
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-bold">
                                            Discount Code
                                        </span>
                                        <span>
                                            {invoiceData.data?.couponCode ||
                                                "N/A"}
                                        </span>
                                    </div>
                                    <hr className="my-2 border-[1px]" />
                                    <div className="flex justify-between">
                                        <span className="font-bold">
                                            Subtotal
                                        </span>
                                        <span className="whitespace-nowrap">
                                            &#2547; {}
                                            {invoiceData.data.totalAmount}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-bold">
                                            Discount
                                        </span>
                                        <span className="whitespace-nowrap">
                                            &#2547; {}
                                            {invoiceData.data.discount}
                                        </span>
                                    </div>
                                    <hr className="my-2 border-[1px]" />
                                    <div className="flex justify-between">
                                        <span className="font-bold">Total</span>
                                        <span className="font-bold whitespace-nowrap">
                                            &#2547; {}
                                            {
                                                invoiceData.data
                                                    .totalAmountAfterDiscount
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">
                                    Terms & Conditions
                                </div>
                                <div>
                                    1. Product once sold will not be taken back.
                                    <br />
                                    2. No guarantee or warranty on product.
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col-reverse md:flex-row gap-2 justify-end mt-5">
                            <Link to={`/${(user as TUser).role}/dashboard`}>
                                <button className="button-primary w-full md:w-auto">
                                    Return to Dashboard
                                </button>
                            </Link>
                            <Link to={`/${(user as TUser).role}/gift-list`}>
                                <button className="button-primary w-full md:w-auto">
                                    Return to Products
                                </button>
                            </Link>
                            <button
                                onClick={downloadPdf}
                                className="button-primary"
                            >
                                Download Invoice
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[50vh]">
                        <Spin tip="Loading"></Spin>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Invoice;
