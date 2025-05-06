// src/modules/Auth/pages/LoginPage.tsx
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {apiClient} from '../../../common/api/axiosConfig';
import {useAuth} from '../../../common/hooks/useAuth';
import {AxiosError} from "axios";

interface LoginForm {
    username: string;
    password: string;
}

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>();

    const {mutate, status, error} = useMutation<string, AxiosError, LoginForm>({
        mutationFn: ({username, password}) =>
            apiClient
                .post('/login/access-token-json', {username, password})
                .then(res => res.data.access_token), // 🔑 sadece token dönüyor
        onSuccess: (token) => {
            login(token); // token'ı decode ederek kullanıcıyı belleğe al
            navigate('/user/dashboard', {replace: true}); // yönlendir
        },
    });

    const onSubmit: SubmitHandler<LoginForm> = (data) => mutate(data);

    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-6 text-center">Giriş Yap</h2>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        type="text"
                        {...register('username', {required: 'Email zorunlu'})}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm mb-1">Şifre</label>
                    <input
                        type="password"
                        {...register('password', {required: 'Şifre zorunlu'})}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={status === 'pending'}
                    className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
                >
                    {status === 'pending' ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </button>

                {status === 'error' && (
                    <p className="text-red-500 text-center mt-4">
                        {(error?.response?.data as any)?.detail || 'Giriş yapılamadı'}
                    </p>
                )}
            </form>
        </div>
    );
};
