import { useEffect, useState } from "react";

const LoadingWidget = ({ id = undefined, className = undefined, children = undefined }) => {
  const [time, setTime] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t % 3 + 1), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id={id} className={className}>
      {children || 'Loading widget'}
      {' '}
      {'.'.repeat(time)}
    </div>
  );
};

export default LoadingWidget;
