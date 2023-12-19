import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number): T {
    // state and setter for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        // cancel the timeout if value changes (also on delay change or unmount)
        // this is how we prevent debounced value from updating if value changes
        // within the delay period, timout gets cleared and restarted
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}