import React, {useState} from 'react';
import {FiAlertCircle, FiCheck, FiEye, FiEyeOff, FiHelpCircle} from 'react-icons/fi';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    success?: string;
    helpText?: string;
    icon?: React.ReactNode;
    register?: any;
    wrapperClass?: string;
    labelClass?: string;
    inputClass?: string;
    showPasswordToggle?: boolean;
    validation?: (value: string) => boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            success,
            helpText,
            icon,
            register,
            name,
            type = 'text',
            className = '',
            wrapperClass = '',
            labelClass = '',
            inputClass = '',
            showPasswordToggle = false,
            validation,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const [isFocused, setIsFocused] = useState(false);
        const [internalValue, setInternalValue] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (validation && !validation(e.target.value)) return;
            setInternalValue(e.target.value);
            if (props.onChange) props.onChange(e);
        };

        const inputType = showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type;

        return (
            <div className={`space-y-1 w-full ${wrapperClass}`}>
                {/* Label ve yardımcı metin */}
                {label && (
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor={name}
                            className={`block text-sm font-medium text-gray-700 mb-1 ${labelClass}`}
                        >
                            {label}
                        </label>
                        {helpText && (
                            <span className="text-xs text-gray-500 flex items-center">
                <FiHelpCircle className="mr-1"/> {helpText}
              </span>
                        )}
                    </div>
                )}

                {/* Input alanı */}
                <div
                    className={`relative rounded-md shadow-sm transition-all duration-200 ${
                        isFocused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                    }`}
                >
                    {/* Icon (sol taraf) */}
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400">{icon}</span>
                        </div>
                    )}

                    {/* Asıl input */}
                    <input
                        id={name}
                        name={name}
                        type={inputType}
                        ref={ref}
                        {...(register ? register(name) : {})}
                        {...props}
                        value={internalValue || props.value}
                        onChange={handleChange}
                        onFocus={(e) => {
                            setIsFocused(true);
                            if (props.onFocus) props.onFocus(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            if (props.onBlur) props.onBlur(e);
                        }}
                        className={`block w-full rounded-md border ${
                            error
                                ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                                : success
                                    ? 'border-green-300 text-green-900 placeholder-green-300 focus:outline-none focus:ring-green-500 focus:border-green-500'
                                    : 'border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                        } ${icon ? 'pl-10' : 'pl-3'} ${
                            showPasswordToggle && type === 'password' ? 'pr-10' : 'pr-3'
                        } py-2 sm:text-sm ${inputClass} ${className}`}
                    />

                    {/* Şifre göster/gizle veya validasyon ikonu (sağ taraf) */}
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {showPasswordToggle && type === 'password' ? (
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff size={18}/> : <FiEye size={18}/>}
                            </button>
                        ) : error ? (
                            <FiAlertCircle className="h-5 w-5 text-red-500"/>
                        ) : success ? (
                            <FiCheck className="h-5 w-5 text-green-500"/>
                        ) : null}
                    </div>
                </div>

                {/* Hata veya başarı mesajı */}
                {error &&
                    <p className="text-sm text-red-600 flex items-center mt-1"><FiAlertCircle className="mr-1"/> {error}
                    </p>}
                {success &&
                    <p className="text-sm text-green-600 flex items-center mt-1"><FiCheck className="mr-1"/> {success}
                    </p>}
            </div>
        );
    }
);

Input.displayName = 'Input';