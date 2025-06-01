import React from 'react';

interface SettingItemProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  toggleValue?: boolean;
  toggleLoading?: boolean;
  onClick?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  description,
  toggleValue,
  toggleLoading,
  onClick,
}) => (
  <li
    className="flex justify-between gap-x-6 py-3 cursor-pointer secondary-bg rounded-lg shadow mb-4 px-4 items-center"
    onClick={onClick}
    tabIndex={0}
    role="button"
    onKeyDown={e => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    }}
    aria-disabled={toggleLoading}
  >
    <div className="flex min-w-0 gap-x-4 items-center">
      {icon && (
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold primary-text">{title}</p>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
    </div>
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        toggleValue ? 'bg-green-500' : 'bg-gray-300'
      }`}
      disabled={toggleLoading}
      onClick={e => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      tabIndex={-1}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          toggleValue ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </li>
);

export default SettingItem;
