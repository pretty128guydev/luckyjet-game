import { useEffect, useRef, useState } from "react";

const useSmoothMoney = (targetValue, duration = 500) => {
  const [currentValue, setCurrentValue] = useState(targetValue);
  const frame = useRef();
  const start = useRef();
  const initialValue = useRef(currentValue);

  useEffect(() => {
    initialValue.current = currentValue;
    start.current = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start.current) / duration, 1);
      const newValue = initialValue.current + (targetValue - initialValue.current) * progress;

      setCurrentValue(newValue);

      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      }
    };

    frame.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame.current);
  }, [targetValue, duration]);

  return currentValue;
};

export default useSmoothMoney;
