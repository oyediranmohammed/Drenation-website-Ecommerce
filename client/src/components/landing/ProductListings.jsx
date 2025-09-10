import React from 'react';

function ProductListings({ products, loading }) {
  return (
    <section className="px-6 py-10">
      <h3 className="text-xl font-semibold mb-4">Recent Listings</h3>
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={
                    item.image ||
                    "https://via.placeholder.com/200x150?text=Product"
                  }
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-gold font-semibold">{item.price}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.state}, {item.lga}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full col-span-full">
              No products found for selected location.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default ProductListings;
