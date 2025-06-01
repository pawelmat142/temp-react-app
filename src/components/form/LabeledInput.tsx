import React from 'react';

const LabeledInput: React.FC<{
    id: string,
    label: string,
    type?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    autoComplete?: string,
    name?: string
}> = ({ id, label, type = "text", value, onChange, required, autoComplete, name }) => (
    <div>
        <label htmlFor={id} className="block text-sm/6 font-medium primary-text">
            {label}
        </label>
        <div className="mt-2">
            <input
                id={id}
                name={name || id}
                type={type}
                value={value}
                onChange={onChange}
                className="block w-full rounded-md primary-bg px-3 py-1.5 text-base primary-text primary-color-control sm:text-sm/6"
                required={required}
                autoComplete={autoComplete}
            />
        </div>
    </div>
);

export default LabeledInput;
