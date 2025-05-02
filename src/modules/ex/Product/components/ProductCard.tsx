// src/modules/Product/components/ProductCard.tsx
import React from 'react';
import { Product } from '../types';
import { Card } from '../../../../common/components/ui/Card.tsx';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => (
  <Card title={product.name}>
    <p><strong>Fiyat:</strong> ${product.price}</p>
    <p><strong>Stokta:</strong> {product.inStock ? 'Var' : 'Yok'}</p>
  </Card>
);