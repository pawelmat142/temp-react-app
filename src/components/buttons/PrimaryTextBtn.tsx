import { Link } from "react-router-dom";
import { BtnInterface } from "../btn-interface";

const PrimaryTextBtn: React.FC<BtnInterface> = ({ to = '', children, type='button', fullWidth, className, disabled }) => {
    let myClass = "flex justify-center rounded-md primary-transparent-control shadow-sm text-sm/6 font-semibold primary-color py-1.5 px-3";
    if (fullWidth) {
        myClass += ' w-full';
    }
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
                onClick={disabled ? (e) => e.preventDefault() : undefined}
            >
                {children}
            </Link>
        );
    } else {
        return(
            <button
                type={type}
                className={myClass}
                disabled={disabled}
            >
                {children}
            </button>
        )
    }
}
export default PrimaryTextBtn;
