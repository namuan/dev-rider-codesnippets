import { useToken } from "./hooks/useToken";
import { useProduct } from "./hooks/useProduct";
import { ProductDetail } from "./components/ProductDetail";

function App() {
  const clientId = "emilys";
  const clientSecret = "emilyspass";
  const { token, tokenError, tokenLoading } = useToken(clientId, clientSecret);
  const { data: productData, isLoading, error } = useProduct(token);

  if (tokenLoading) return <div className="text-center mt-8">Retrieving token...</div>;
  if (tokenError) return <div className="text-center mt-8 text-red-500">Token Error: {tokenError}</div>;
  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;
  if (!productData) return null;

  return <ProductDetail product={productData} />;
}

export default App