import React from 'react';

const categories = [
  "Phones & Tablets",
  "Computers & Laptops",
  "Electronics",
  "Vehicles",
  "Fashion",
  "Home & Garden",
  "Health & Beauty",
  "Real Estate",
];

function CategoryGrid() {
  return (
    <section className="px-6 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {categories.map((cat, index) => (
        <div
          key={index}
          className="bg-gold text-black rounded-lg p-4 text-center font-medium hover:scale-105 transition cursor-pointer"
        >
          {cat}
        </div>
      ))}
    </section>
  );
}

export default CategoryGrid;
