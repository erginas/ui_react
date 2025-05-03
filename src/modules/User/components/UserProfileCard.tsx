// src/modules/User/components/UserProfileCard.tsx
import React from 'react';
import { User } from '../types.ts';
import { Card } from '../../../common/components/ui/Card.tsx';

interface Props {
  user: User;
}

export const UserProfileCard: React.FC<Props> = ({ user }) => (
  <Card title="Profil">
    <p><strong>Ad:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
  </Card>
);
