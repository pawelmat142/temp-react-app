export interface BtnInterface {
    to?: string;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}