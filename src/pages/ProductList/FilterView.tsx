/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
    useProductBrandMutation,
    useProductCategoryMutation,
    useProductOccasionMutation,
    useProductThemeMutation,
} from "../../redux/feature/product/productApi";
import { Button } from "antd";

const FilterView = ({
    setQueryData,
}: {
    queryData: {
        name: string;
        category: string;
        brand: string;
        occasion: string;
        theme: string;
    };
    setQueryData: React.Dispatch<
        React.SetStateAction<{
            name: string;
            category: string;
            brand: string;
            occasion: string;
            theme: string;
            minPrice: number;
            maxPrice: number;
        }>
    >;
}) => {
    const [productCategory] = useProductCategoryMutation();
    const [productBrand] = useProductBrandMutation();
    const [productOccasion] = useProductOccasionMutation();
    const [productTheme] = useProductThemeMutation();
    const [productCategories, setProductCategories] = useState([]);
    const [productBrands, setProductBrands] = useState([]);
    const [productOccasions, setProductOccasions] = useState([]);
    const [productThemes, setProductThemes] = useState([]);

    const [selectedName, setSelectedName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedOccasion, setSelectedOccasion] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("");

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const getProductCategory = async () => {
        const res = await productCategory(undefined).unwrap();
        const data = res.data.map((item: { _id: string; name: string }) => {
            return {
                label: item.name,
                value: item._id,
            };
        });
        return data;
    };

    const getProductBrand = async () => {
        const res = await productBrand(undefined).unwrap();
        const data = res.data.map((item: { _id: string; name: string }) => {
            return {
                label: item.name,
                value: item._id,
            };
        });
        return data;
    };

    const getProductOccasion = async () => {
        const res = await productOccasion(undefined).unwrap();
        const data = res.data.map((item: { _id: string; name: string }) => {
            return {
                label: item.name,
                value: item._id,
            };
        });
        return data;
    };

    const getProductTheme = async () => {
        const res = await productTheme(undefined).unwrap();
        const data = res.data.map((item: { _id: string; name: string }) => {
            return {
                label: item.name,
                value: item._id,
            };
        });
        return data;
    };

    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                const tProductCategory = await getProductCategory();
                const tProductBrand = await getProductBrand();
                const tProductOccasion = await getProductOccasion();
                const tProductTheme = await getProductTheme();
                setProductCategories(tProductCategory);
                setProductBrands(tProductBrand);
                setProductOccasions(tProductOccasion);
                setProductThemes(tProductTheme);
            } catch (error) {
                console.error("Error fetching product categories:", error);
            }
        };

        fetchProductCategories();
    }, []);

    const handleSearch = () => {
        setQueryData({
            name: selectedName,
            category: selectedCategory,
            brand: selectedBrand,
            occasion: selectedOccasion,
            theme: selectedTheme,
            minPrice:
                !isNaN(parseFloat(minPrice)) && parseFloat(minPrice) > 0
                    ? parseFloat(minPrice)
                    : 0,
            maxPrice: !isNaN(parseFloat(maxPrice)) ? parseFloat(maxPrice) : -1,
        });
    };

    const handleReset = () => {
        setSelectedName("");
        setSelectedCategory("");
        setSelectedBrand("");
        setSelectedOccasion("");
        setSelectedTheme("");
        setMinPrice("");
        setMaxPrice("");
        setQueryData({
            name: "",
            category: "",
            brand: "",
            occasion: "",
            theme: "",
            minPrice: 0,
            maxPrice: -1,
        });
    };

    const [showFilter, setShowFilter] = useState(false);

    return (
        <div>
            <div className="bg-[var(--primary-color)] py-4 px-2 rounded w-full xl:w-[300px]">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1 bg-[var(--primary-color)]  p-2 rounded-md">
                        <h2 className="text-lg font-medium">Name</h2>
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="w-full rounded-md border-2 border-gray-200 px-2 py-1 "
                            value={selectedName}
                            onChange={(e) => setSelectedName(e.target.value)}
                        />
                    </div>
                    <div className="select-none m-2">
                        <h2 className="text-lg font-medium">Price Range</h2>
                        <div className="flex items-center gap-1 py-1">
                            <input
                                type="text"
                                id="minPrice"
                                name="filter"
                                placeholder="Min Price"
                                value={minPrice}
                                className="w-full rounded-md border-2 border-gray-200 px-2 py-1"
                                onChange={(e) => {
                                    setMinPrice(e.target.value);
                                }}
                            />
                            <div className="text-lg font-medium text-gray-400">
                                -
                            </div>
                            <input
                                type="text"
                                id="maxPrice"
                                name="filter"
                                placeholder="Max Price"
                                value={maxPrice}
                                className="w-full rounded-md border-2 border-gray-200 px-2 py-1"
                                onChange={(e) => {
                                    setMaxPrice(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="select-none m-2">
                        <div
                            className="pl-2 flex gap-3 hover:cursor-pointer flex-row items-center bg-gray-50 py-1 mb-0"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            {showFilter ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            )}
                            <h2 className="text-[16px] font-medium">Filter</h2>
                        </div>
                        <div
                            className={`${showFilter ? "flex flex-col gap-2 mt-0 pt-2" : "hidden"} bg-gray-50`}
                        >
                            <div className="flex flex-col gap-1 bg-[var(--primary-color)] m-[10px] p-1 rounded-md">
                                <h2 className="text-lg font-medium">
                                    Category
                                </h2>
                                <div className="flex flex-row flex-wrap gap-1">
                                    {productCategories.map(
                                        (item: {
                                            label: string;
                                            value: string;
                                        }) => (
                                            <button
                                                key={item.value}
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        item.value,
                                                    )
                                                }
                                                className={`${selectedCategory === item.value ? "bg-gray-400" : ""} hover:bg-gray-400 text-[var(--secondary-color)] text-xs px-[5px] py-[1px] rounded-md hover:rounded-md border-2 border-gray-200`}
                                            >
                                                {item.label}
                                            </button>
                                        ),
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 bg-[var(--primary-color)] m-[10px] p-1 rounded-md">
                                <h2 className="text-lg font-medium">Brands</h2>
                                <div className="flex flex-row flex-wrap gap-1">
                                    {productBrands.map(
                                        (
                                            item: {
                                                label: string;
                                                value: string;
                                            },
                                            index,
                                        ) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setSelectedBrand(item.value)
                                                }
                                                className={`${selectedBrand === item.value ? "bg-gray-400" : ""} hover:bg-gray-400 text-[var(--secondary-color)] text-xs px-[5px] py-[1px] rounded-md hover:rounded-md border-2 border-gray-200`}
                                            >
                                                {item.label}
                                            </button>
                                        ),
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 bg-[var(--primary-color)] m-[10px] p-1 rounded-md">
                                <h2 className="text-lg font-medium">
                                    Occasion
                                </h2>
                                <div className="flex flex-row flex-wrap gap-1">
                                    {productOccasions.map(
                                        (
                                            item: {
                                                label: string;
                                                value: string;
                                            },
                                            index,
                                        ) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setSelectedOccasion(
                                                        item.value,
                                                    )
                                                }
                                                className={`${selectedOccasion === item.value ? "bg-gray-400" : ""} hover:bg-gray-400 text-[var(--secondary-color)] text-xs px-[5px] py-[1px] rounded-md hover:rounded-md border-2 border-gray-200`}
                                            >
                                                {item.label}
                                            </button>
                                        ),
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 bg-[var(--primary-color)] m-[10px] p-1 rounded-md">
                                <h2 className="text-lg font-medium">Theme</h2>
                                <div className="flex flex-row flex-wrap gap-1">
                                    {productThemes.map(
                                        (
                                            item: {
                                                label: string;
                                                value: string;
                                            },
                                            index,
                                        ) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setSelectedTheme(item.value)
                                                }
                                                className={`${selectedTheme === item.value ? "bg-gray-400" : ""} hover:bg-gray-400 text-[var(--secondary-color)] text-xs px-[5px] py-[1px] rounded-md hover:rounded-md border-2 border-gray-200`}
                                            >
                                                {item.label}
                                            </button>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-3 mt-5">
                    <div className="flex justify-center">
                        <Button onClick={handleSearch}>Search</Button>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterView;
