// src/modules/User/components/UserProfileCard.tsx
import React from 'react';
import {Kisi} from '../types.ts';
import {Card} from '../../../../common/components/ui/Card.tsx';

interface Props {
    kisi: Kisi;
}

export const KisiProfileCard: React.FC<Props> = ({kisi}) => (
    <Card title="Profil">
        <p><strong>Kimlk No:</strong> {kisi.kimlik_no}</p>
        <p><strong>Adı:</strong> {kisi.adi}</p>
        <p><strong>Soyadı:</strong> {kisi.soyadi}</p>
        <p><strong>Doğum Tarihi:</strong> {kisi.dogum_tarihi}</p>
    </Card>
);
