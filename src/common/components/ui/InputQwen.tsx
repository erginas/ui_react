// src/common/components/ui/Input.tsx

interface InputProps {
    label: string;
    error?: string;
    register: any; // react-hook-form register fonksiyonu
    name: string;
    type?: string;
    readOnly?: boolean;
}

export function Input({ label, error, register, name, type = "text", readOnly = false }: InputProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium">{label}</label>
            <input
                {...register(name)}
                type={type}
                readOnly={readOnly}
                className={`w-full border rounded px-3 py-1 ${
                    error ? 'border-red-500' : 'border-gray-300'
                } ${readOnly ? 'bg-gray-100' : ''}`}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}