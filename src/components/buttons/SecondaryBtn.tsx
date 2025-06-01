import { Link } from "react-router-dom";
import { BtnInterface } from "../btn-interface";

const GrayBtn: React.FC<BtnInterface> = ({
    to = '',
    type = 'button',
    onClick,
    children,
    fullWidth = true,
    className
}) => {
    let myClass = `btn flex justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm/6 font-semibold text-gray-800 shadow-sm hover:bg-gray-400`;
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
        return (
            <button type={type} onClick={onClick} className={myClass}>
                {children}
            </button>
        );
    }
};

export default GrayBtn;