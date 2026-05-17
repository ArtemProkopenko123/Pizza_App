type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
}
const Button = ({ children, className, ...props }: Props) => {
    return (
        <button className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer active:bg-blue-700 ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button;