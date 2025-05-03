// src/modules/Auth/pages/LoginPage.tsx
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useNavigate} from 'react-router-dom';
import {apiClient} from "../../../common/api/axiosConfig.ts";
import {Token} from "../../../common/types/token.ts";

interface LoginForm {
    username: string;
    password: string;
}

export const LoginPage: React.FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>();
    const navigate = useNavigate();

    const {mutate, status, error} = useMutation<Token, AxiosError, LoginForm>({
        mutationFn: ({username, password}) =>
            apiClient.post<Token>('/login/access-token-json', {username, password})
                .then(res => res.data),
        onSuccess: ({access_token}) => {
            localStorage.setItem('authToken', access_token);
            navigate('/user/dashboard');
        },
    });

    const onSubmit: SubmitHandler<LoginForm> = data => mutate(data);

    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-6 text-center">Giriş Yap</h2>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        type="text"
                        {...register('username', {required: 'Email zorunlu'})}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm mb-1">Şifre</label>
                    <input
                        type="password"
                        {...register('password', {required: 'Şifre zorunlu'})}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={status === 'pending'}
                    className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
                >
                    {status === 'pending' ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </button>

                {status === 'error' && (
                    <p className="text-red-500 text-center mt-4">
                        {((error as AxiosError<{ detail: string }>).response?.data.detail) || 'Giriş yapılamadı'}
                    </p>
                )}
            </form>
        </div>
    );
};