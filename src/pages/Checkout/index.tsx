/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import GForm from "../../components/form/GForm";
import GInput from "../../components/form/GInput";
import { Col, Row, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { calculateDiscount, calculateTotalAmount } from "../../utils/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../../Schemas/checkout.schema";
import { logout, useCurrentToken } from "../../redux/feature/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types";
import { useCreateInvoiceMutation } from "../../redux/feature/Invoice/invoice.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { clearCart } from "../../redux/feature/cart/cartSlice";
import { removeCoupon } from "../../redux/feature/coupon/couponSlice";
import { useEffect } from "react";

const Checkout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const token = useAppSelector(useCurrentToken);
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const couponDetails = useAppSelector((state) => state.coupon.couponDetails);

    const [createInvoice] = useCreateInvoiceMutation();

    const user = verifyToken(token as string) || {};

    if (!user) {
        dispatch(logout());
    }

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/");
        }
    }, [cartItems, navigate]);

    const tableData = cartItems.map((item, index) => {
        return {
            key: index + 1,
            productId: item.productId,
            name: item.productName,
            price: item.price,
            quantity: item.quantity,
        };
    });

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
                return <span>&#2547; {record.price}</span>;
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
                return <span>&#2547; {record.price * record.quantity}</span>;
            },
        },
    ];

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Selling Products...");

        const invoiceData = {
            totalAmount: calculateTotalAmount(cartItems),
            discount: couponDetails
                ? calculateDiscount(
                      calculateTotalAmount(cartItems),
                      couponDetails,
                  )
                : 0,
            totalAmountAfterDiscount:
                calculateTotalAmount(cartItems) -
                (couponDetails
                    ? calculateDiscount(
                          calculateTotalAmount(cartItems),
                          couponDetails,
                      )
                    : 0),
            couponCode: couponDetails?.code || null,
            buyerName: data.buyerName,
            products: cartItems.map((item) => {
                return {
                    productId: item.productId,
                    productName: item.productName,
                    price: item.price,
                    quantity: item.quantity,
                };
            }),
            sellDate: new Date().toISOString().split("T")[0],
            sellerId: (user as TUser)?.id.toString(),
        };
        console.log(invoiceData);

        try {
            const res = await createInvoice(invoiceData).unwrap();
            console.log(res);

            if (res.success) {
                toast.success("Products Sold Successfully", { id: toastId });
                dispatch(clearCart());
                dispatch(removeCoupon());
                navigate(`/products/cart/check-out/invoice/${res.data._id}`);
            } else {
                toast.error("Failed to sell products", { id: toastId });
            }
        } catch (error) {
            toast.error("Failed to sell products", { id: toastId });
        }
    };

    return (
        <div>
            <div className="bg-[--primary-color] px-7 py-10">
                <GForm
                    onSubmit={onSubmit}
                    disableReset={true}
                    resolver={zodResolver(checkoutSchema)}
                >
                    <Row gutter={16}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <GInput
                                type="text"
                                name="buyerName"
                                label="Buyer Name"
                                placeholder="Enter Buyer Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <GInput
                                type="text"
                                name="buyerEmail"
                                label="Buyer Email"
                                placeholder="Enter Buyer Email (Optional)"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <GInput
                                type="text"
                                name="buyerContactNumber"
                                label="Buyer Contact Number"
                                placeholder="Enter Buyer Contact Number (Optional)"
                            />
                        </Col>
                    </Row>
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
                                    {cartItems.reduce(
                                        (acc, item) => acc + item.quantity,
                                        0,
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold">Discount Code</span>
                                <span>{couponDetails?.code}</span>
                            </div>
                            <hr className="my-2 border-[1px]" />
                            <div className="flex justify-between">
                                <span className="font-bold">Subtotal</span>
                                <span>
                                    &#2547; {}
                                    {calculateTotalAmount(cartItems)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold">Discount</span>
                                <span>
                                    &#2547; {}
                                    {couponDetails
                                        ? calculateDiscount(
                                              calculateTotalAmount(cartItems),
                                              couponDetails,
                                          )
                                        : 0}
                                </span>
                            </div>
                            <hr className="my-2 border-[1px]" />
                            <div className="flex justify-between">
                                <span className="font-bold">Total</span>
                                <span className="font-bold">
                                    &#2547; {}
                                    {calculateTotalAmount(cartItems) -
                                        (couponDetails
                                            ? calculateDiscount(
                                                  calculateTotalAmount(
                                                      cartItems,
                                                  ),
                                                  couponDetails,
                                              )
                                            : 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="button-primary w-full">
                        Checkout
                    </button>
                </GForm>
            </div>
        </div>
    );
};

export default Checkout;
