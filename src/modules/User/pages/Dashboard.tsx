// src/modules/User/pages/Dashboard.tsx
import React from 'react';
import {useUsers} from '../hooks/useUsers';
import {UserProfileCard} from '../components/UserProfileCard';

export const UserDashboard: React.FC = () => {
    const {data: users, isLoading, error} = useUsers();

    if (isLoading) return <div>Yükleniyor…</div>;
    if (error) return <div>Hata oluştu</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users!.map(user => (
                <UserProfileCard key={user.id} user={user}/>
            ))}
        </div>
    );
};

export default UserDashboard