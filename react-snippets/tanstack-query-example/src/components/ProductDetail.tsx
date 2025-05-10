import { Product } from '../types/Product';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    meta,
    thumbnail,
    images,
  } = product;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          {thumbnail && <img src={thumbnail} alt={title} className="w-64 h-64 object-cover rounded-lg border" />}
          <div className="flex gap-2 mt-2">
            {images?.map((img, idx) => (
              <img key={idx} src={img} alt={title + ' ' + idx} className="w-16 h-16 object-cover rounded border" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-2 text-lg">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            <div><span className="font-semibold">Category:</span> {category}</div>
            <div><span className="font-semibold">Brand:</span> {brand}</div>
            <div><span className="font-semibold">SKU:</span> {sku}</div>
            <div><span className="font-semibold">Price:</span> ${price} <span className="text-green-600">({discountPercentage}% off)</span></div>
            <div><span className="font-semibold">Rating:</span> {rating}</div>
            <div><span className="font-semibold">Stock:</span> {stock}</div>
            <div><span className="font-semibold">Availability:</span> {availabilityStatus}</div>
            <div><span className="font-semibold">Weight:</span> {weight}g</div>
            <div><span className="font-semibold">Dimensions:</span> {dimensions?.width} x {dimensions?.height} x {dimensions?.depth} cm</div>
            <div><span className="font-semibold">Warranty:</span> {warrantyInformation}</div>
            <div><span className="font-semibold">Shipping:</span> {shippingInformation}</div>
            <div><span className="font-semibold">Return Policy:</span> {returnPolicy}</div>
            <div><span className="font-semibold">Min Order Qty:</span> {minimumOrderQuantity}</div>
            <div><span className="font-semibold">Tags:</span> {tags?.join(', ')}</div>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Meta:</span>
            <ul className="ml-4 list-disc">
              <li>Created: {meta?.createdAt}</li>
              <li>Updated: {meta?.updatedAt}</li>
              <li>Barcode: {meta?.barcode}</li>
              <li>QR Code: {meta?.qrCode}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        {reviews?.length ? (
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div key={idx} className="border rounded p-3 bg-gray-50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{review.reviewerName}</span>
                  <span className="text-xs text-gray-500">({review.reviewerEmail})</span>
                  <span className="ml-auto text-yellow-500">Rating: {review.rating}</span>
                </div>
                <div className="text-sm mb-1">{review.comment}</div>
                <div className="text-xs text-gray-400">{new Date(review.date).toLocaleString()}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>No reviews yet.</div>
        )}
      </div>
    </div>
  );
}