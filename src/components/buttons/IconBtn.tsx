import React from 'react';
import { BtnInterface } from '../btn-interface';
import { Link } from 'react-router-dom';


const IconButton: React.FC<BtnInterface> = ({ to='', type = 'button', onClick, children, className, disabled }) => {
    let myClass = `p-2 rounded-full hover:bg-gray-100 primary-color hover:text-blue-800`;
    if (className) {
        myClass += ` ${className}`;
    }
    if (disabled) {
        myClass += ' opacity-50 pointer-events-none cursor-not-allowed';
    }

    if (to) {
        return (
            <Link
                to={to}
                className={myClass}
                tabIndex={disabled ? -1 : undefined}
                aria-disabled={disabled ? 'true' : undefined}
                onClick={disabled ? (e) => e.preventDefault() : onClick}
            >
                {children}
            </Link>
        );
    } else {    
        return(
            <button
                type={type}
                onClick={onClick}
                className={myClass}
                disabled={disabled}
            >
                {children}
            </button>
        )
    }
};

export default IconButton;
