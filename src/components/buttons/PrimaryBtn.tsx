import React from 'react';
import { BtnInterface } from '../btn-interface';
import { Link } from 'react-router-dom';


const PrimaryBtn: React.FC<BtnInterface> = ({ to='', type = 'button', onClick, children, fullWidth=true, className }) => {
    let myClass = `flex justify-center rounded-md btn-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm`;
    if (className) {
        myClass += ` ${className}`;
    }
    if (fullWidth) {
        myClass += ' w-full';
    }

    if (to) {
        return (
            <Link to={to} className={myClass}>
                {children}
            </Link>
        );
    } else {    
        return(
            <button type={type} onClick={onClick} className={myClass}>{children}</button>
        )
    }
};

export default PrimaryBtn;
