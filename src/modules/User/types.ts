// src/modules/User/types.ts
export interface User {
    id: number;
    email: string;
    full_name: string;
    is_active: boolean;
    is_superuser: boolean;
}