import React, { useRef, useEffect } from 'react';

interface LabeledTextareaProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    autoComplete?: string;
    name?: string;
    rows?: number;
    className?: string;
}

const LabeledTextarea: React.FC<LabeledTextareaProps> = ({
    id,
    label,
    value,
    onChange,
    required,
    autoComplete,
    name,
    rows = 3,
    className = ''
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [value]);

    return (
        <div>
            <label htmlFor={id} className="block text-sm/6 font-medium primary-text">
                {required && <span className="text-red-500">*</span>} {label}
            </label>
            <div className="mt-2">
                <textarea
                    ref={textareaRef}
                    id={id}
                    name={name || id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    autoComplete={autoComplete}
                    rows={rows}
                    className={`block w-full rounded-md primary-bg px-3 py-1.5 text-base primary-text primary-color-control sm:text-sm/6 resize-none ${className}`}
                    style={{ overflow: 'hidden' }}
                />
            </div>
        </div>
    );
};

export default LabeledTextarea;
