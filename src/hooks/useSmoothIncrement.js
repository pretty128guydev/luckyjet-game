import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to increment a value smoothly.
 * @param {number} targetValue - The target value to increment towards.
 * @param {number} incrementSpeed - The speed of the increment in milliseconds.
 * @returns {number} - The smoothly incremented value.
 */
const useSmoothIncrement = (targetValue, incrementSpeed = 30) => {
  const [displayValue, setDisplayValue] = useState(1);
  const targetRef = useRef(targetValue);
  const animationFrame = useRef(null);

  useEffect(() => {
    targetRef.current = targetValue;
  }, [targetValue]);

  useEffect(() => {
    const incrementValue = () => {
      setDisplayValue((prev) => {
        const diff = targetRef.current - prev;
        if (Math.abs(diff) < 0.01) {
          // Stop incrementing when close enough to target
          return targetRef.current;
        }
        // Increment towards the target value
        const newValue = prev + (diff / incrementSpeed);
        return newValue;
      });
      animationFrame.current = requestAnimationFrame(incrementValue);
    };

    incrementValue();

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, [incrementSpeed]);

  return displayValue;
};

export default useSmoothIncrement;
