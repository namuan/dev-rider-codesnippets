import {useProduct} from "./hooks/useProduct";
import {ProductDetail} from "./components/ProductDetail";
import {useState} from "react";

function App() {
    const [productId, setProductId] = useState(3);
    const {data: productData, isLoading, error} = useProduct(productId);

    const handlePrevious = () => {
        if (productId > 1) {
            setProductId((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (productId <= 100) {
            setProductId((prev) => prev + 1);
        }
    };

    if (isLoading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;
    if (!productData) return null;

    return <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between mb-4">
            <button
                onClick={handlePrevious}
                disabled={productId <= 1}
                className={`px-4 py-2 rounded ${
                    productId <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
            >
                Previous
            </button>
            <button
                onClick={handleNext}
                disabled={productId >= 100}
                className={`px-4 py-2 rounded ${
                    productId >= 100 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
            >
                Next
            </button>
        </div>
        <ProductDetail product={productData}/>
    </div>;
}

export default App