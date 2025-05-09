// src/common/components/ui/Section.tsx

import React from 'react';

interface SectionProps {
    title: string;
    onAction?: () => void;
    actionLabel?: string;
    children: React.ReactNode;
}

export default function Section({title, onAction, actionLabel, children}: SectionProps) {
    return (
        <section className="mb-6">
            <div className="flex justify-between items-center mb-3 pb-2 border-b">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                {onAction && (
                    <button
                        onClick={onAction}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        {actionLabel || "Detaylı Gör"}
                    </button>
                )}
            </div>
            <div>{children}</div>
        </section>
    );
}