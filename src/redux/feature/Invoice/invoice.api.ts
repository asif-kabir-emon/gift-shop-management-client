import { baseApi } from "../../api/baseApi";

const InvoiceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createInvoice: builder.mutation({
            query: (data) => ({
                url: "/invoice/create-invoice",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["products"],
        }),
        getAllInvoices: builder.query({
            query: (query) => ({
                url: "/sale-info/get-sale-info",
                method: "GET",
                params: query,
            }),
        }),
        getInvoiceById: builder.query({
            query: (id) => ({
                url: `/invoice/get-invoice/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useCreateInvoiceMutation,
    useGetAllInvoicesQuery,
    useGetInvoiceByIdQuery,
} = InvoiceApi;
