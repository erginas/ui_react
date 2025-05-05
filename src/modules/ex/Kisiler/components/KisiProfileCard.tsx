// src/modules/User/components/UserProfileCard.tsx
import React from 'react';
import {Kisi} from '../types';
import {Card} from '../../../../common/components/ui/Card';

interface Props {
    kisi: Kisi;
}

export const KisiProfileCard: React.FC<Props> = ({kisi}) => (
    <Card title="Kisiler">
        <p><strong>Kimlk No:</strong> {kisi.kimlik_no}</p>
        <p><strong>Adı:</strong> {kisi.adi}</p>
        <p><strong>Soyadı:</strong> {kisi.soyadi}</p>
        <p><strong>Doğum Tarihi:</strong> {kisi.dogum_tarihi}</p>
    </Card>
);
