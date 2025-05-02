// src/modules/User/components/UserProfileCard.tsx
import React from 'react';
import { User } from '../types';
import { Card } from '@/common/components/Card';

interface Props {
  user: User;
}

export const UserProfileCard: React.FC<Props> = ({ user }) => (
  <Card title="Profil">
    <p><strong>Ad:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
  </Card>
);
