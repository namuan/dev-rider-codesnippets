import {useProduct} from "./hooks/useProduct";
import {ProductDetail} from "./components/ProductDetail";

function App() {
    const {data: productData, isLoading, error} = useProduct();

    if (isLoading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;
    if (!productData) return null;

    return <ProductDetail product={productData}/>;
}

export default App