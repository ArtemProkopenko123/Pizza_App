type Props = {
    content: React.ReactNode;
    children: React.ReactNode;
}

const Tooltip = ({ content, children }: Props) => {
    return (
        <div className="relative group inline-block">
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {content}
            </div>
        </div>
    );
}

export default Tooltip;
