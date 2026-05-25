export default function Loading() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[200px] rounded-md bg-gray-200 animate-pulse" />
            ))}
        </div>
    );
}
