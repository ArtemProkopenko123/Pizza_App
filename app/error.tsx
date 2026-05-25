"use client"
import Button from "@/components/shared/button";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div>
            <p>Something went wrong: {error.message}</p>
            <Button onClick={reset}>Try again</Button>
        </div>
    );
}
