export default function Loading() {
    return (
        <div className="animate-pulse">
            <div className="h-8 w-20 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-4">
                <div className="h-[300px] w-[300px] mx-auto sm:w-full bg-gray-200 rounded-md" />
                <div className="flex flex-col gap-3">
                    <div className="h-8 w-3/4 bg-gray-200 rounded" />
                    <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-200 rounded-full" />
                        <div className="h-6 w-16 bg-gray-200 rounded-full" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-5/6 bg-gray-200 rounded" />
                        <div className="h-4 w-4/6 bg-gray-200 rounded" />
                    </div>
                    <div className="flex gap-4 mt-2">
                        <div className="h-6 w-20 bg-gray-200 rounded" />
                        <div className="h-6 w-20 bg-gray-200 rounded" />
                        <div className="h-6 w-20 bg-gray-200 rounded" />
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="h-9 w-24 bg-gray-200 rounded" />
                        <div className="h-9 w-32 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}
