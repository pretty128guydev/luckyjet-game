import { useEffect, useState } from 'react';

const useSmoothIncrement = (targetCoefficient) => {
  const [displayCoefficient, setDisplayCoefficient] = useState(1);
  const [increment, setIncrement] = useState(0.01);

  useEffect(() => {

    const interval = setInterval(() => {
      setDisplayCoefficient(prev => {
        const newCoefficient = prev + increment * Math.floor(targetCoefficient);
        if (newCoefficient >= targetCoefficient) {
          clearInterval(interval);
          return targetCoefficient;
        }
        return newCoefficient;
      });

      // Smoothly transition to the next increment step
    }, 100); // Shorter interval for smoother increments

    return () => clearInterval(interval);
  }, [targetCoefficient]);

  return displayCoefficient;
};

export default useSmoothIncrement;
