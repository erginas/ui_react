// src/common/components/ui/DatePicker.tsx

import {Control, Controller} from 'react-hook-form';

interface DatePickerProps {
    label: string;
    name: string;
    control: Control<any>;
    readOnly?: boolean;
}

export function DatePicker({label, name, control, readOnly = false}: DatePickerProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => {
                let dateValue = '';
                if (field.value) {
                    try {
                        // Date objesi mi? ISO tarih olarak çevir
                        dateValue = new Date(field.value).toISOString().split('T')[0];
                    } catch (e) {
                        // String ise doğrudan kullan
                        dateValue = field.value.split('T')[0];
                    }
                }

                return (
                    <div className="space-y-1 w-full">
                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                        <input
                            type="date"
                            value={dateValue}
                            onChange={(e) => field.onChange(e.target.value)}
                            readOnly={readOnly}
                            className={`w-full border rounded px-3 py-1 ${
                                error ? 'border-red-500' : 'border-gray-300'
                            } ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                        {error && <p className="text-xs text-red-500">{error.message}</p>}
                    </div>
                );
            }}
        />
    );
}