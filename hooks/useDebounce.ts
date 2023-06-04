import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setdebouncedValue] = useState<T>(value)

    useEffect(() => {
      const timer = setTimeout(() => {
        setdebouncedValue(value);
      }, delay || 500);
    
      return () => {
        clearInterval(timer);
      }
    }, [delay, value])
    

    return debouncedValue;
}

export default useDebounce;
