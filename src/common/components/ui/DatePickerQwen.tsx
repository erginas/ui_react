// src/common/components/ui/DatePicker.tsx
import { Controller, Control } from 'react-hook-form';

interface DatePickerProps {
    label: string;
    name: string;
    control: Control<any>;
    readOnly?: boolean;
}

export function DatePicker({ label, name, control, readOnly = false }: DatePickerProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className="space-y-1">
                    <label className="block text-sm font-medium">{label}</label>
                    <input
                        type="date"
                        value={field.value?.split('T')[0] || ''}
                        onChange={field.onChange}
                        readOnly={readOnly}
                        className={`w-full border rounded px-3 py-1 ${
                            error ? 'border-red-500' : 'border-gray-300'
                        } ${readOnly ? 'bg-gray-100' : ''}`}
                    />
                    {error && <p className="text-xs text-red-500">{error.message}</p>}
                </div>
            )}
        />
    );
}