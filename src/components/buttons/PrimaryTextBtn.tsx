import { Link } from "react-router-dom";
import { BtnInterface } from "../btn-interface";

const PrimaryTextBtn: React.FC<BtnInterface> = ({ to = '', children, type='button', fullWidth, className }) => {
    let myClass = "flex justify-center rounded-md primary-transparent-control shadow-sm text-sm/6 font-semibold primary-color py-1.5 px-3";
    if (fullWidth) {
        className += ' w-full';        
    }
    if (className) {
        myClass += ` ${className}`;
    }
    if (to) {
        return (
            <Link to={to} className={myClass}>
                {children}
            </Link>
        );
    } else {
        return(
            <button type={type} className={myClass}>{children}</button>
        )
    }
}
export default PrimaryTextBtn;
