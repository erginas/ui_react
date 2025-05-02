// src/modules/Product/pages/Inventory.tsx
import React from 'react';
import { Product } from '../types';
import {Table} from "../../../../common/components/ui/Table.tsx";

const mockInventory: Product[] = [
  { id: '1', name: 'Ürün A', price: 99.9, inStock: true },
  { id: '2', name: 'Ürün B', price: 149.5, inStock: false },
  { id: '3', name: 'Ürün C', price: 200, inStock: true },
];

const columns = ['id', 'name', 'price', 'inStock'];
const data = mockInventory.map(item => ({
  id: item.id,
  name: item.name,
  price: item.price + ' ₺',
  inStock: item.inStock ? 'Var' : 'Yok',
}));

// Yalnızca içerik render edilir, Layout içindeki <Sidebar> ve <Topbar> kaldırıldı.
const ProductInventory: React.FC = () => (
  <Table columns={columns} data={data} />
);

export default ProductInventory;