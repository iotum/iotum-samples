import { useEffect, useState } from "react";

const LoadingWidget = ({ id = undefined, className = undefined, error = undefined, children = undefined }) => {
  const [time, setTime] = useState(1);

  useEffect(() => {
    if (error) {
      return;
    }
    const interval = setInterval(() => setTime(t => t % 3 + 1), 500);
    return () => clearInterval(interval);
  }, [error]);

  return (
    <div id={id} className={className}>
      {
        error ?
        (<div>Failed to load widget: {error}</div>) : (
          <>
            {children || 'Loading widget'}
            {' '}
            {'.'.repeat(time)}
          </>
        )
      }
    </div>
  );
};

export default LoadingWidget;
