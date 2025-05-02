import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

const mockProducts: Product[] = [
  { id: '1', name: 'Ürün A', price: 99.9, inStock: true },
  { id: '2', name: 'Ürün B', price: 149.5, inStock: false },
];

// Yalnızca içerik render edilir, Layout içindeki <Sidebar> ve <Topbar> kaldırıldı.
const ProductDashboard: React.FC = () => (
  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {mockProducts.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductDashboard;