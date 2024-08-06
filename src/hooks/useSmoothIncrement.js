import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to increment a value smoothly.
 * @param {number} targetValue - The target value to increment towards.
 * @param {number} speed - The speed of the increment (higher means faster).
 * @returns {number} - The smoothly incremented value.
 */
const useSmoothIncrement = (targetValue, speed = 0.03) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const targetRef = useRef(targetValue);
  const requestRef = useRef(null);

  useEffect(() => {
    targetRef.current = targetValue;
  }, [targetValue]);

  useEffect(() => {
    const incrementValue = () => {
      setDisplayValue((prev) => {
        const diff = targetRef.current - prev;
        if (Math.abs(diff) < 0.01 * Math.floor(targetValue)) {
          // Stop incrementing when close enough to target
          return targetRef.current;
        }
        // Adjust increment calculation for smoother transition
        const newValue = prev + diff * speed;
        return newValue;
      });
      requestRef.current = requestAnimationFrame(incrementValue);
    };

    incrementValue();

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [speed]);

  return displayValue;
};

export default useSmoothIncrement;
