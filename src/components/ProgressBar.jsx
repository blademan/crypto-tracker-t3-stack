import { useEffect, useRef, useState } from "react";
import Button from "./Button";
const ScrollProgress = () => {
  const [percent, setPercent] = useState(0);
  const circumferenceRef = useRef(30 * 2 * Math.PI);

  const calculateScrollPercentage = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setPercent(Math.round((winScroll / height) * 100));
  };

  useEffect(() => {
    window.addEventListener("scroll", calculateScrollPercentage);
    return () => {
      window.removeEventListener("scroll", calculateScrollPercentage);
    };
  }, []);
  const circumference = circumferenceRef.current || 1;
  return (
    <div>
      <Button />

      <div className="fixed bottom-0 left-0 h-1 w-full bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div
        className="fixed bottom-5 right-5 inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-800/90"
        style={{ width: "80px", height: "80px" }}
      >
        <svg className="h-20 w-20 -rotate-90 transform">
          <circle
            className="text-gray-300"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="40"
            cy="40"
          />
          <circle
            className="text-purple-500"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (percent / 100) * circumference}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="40"
            cy="40"
          />
        </svg>
        <span className="absolute text-xl text-purple-500">{`${percent}%`}</span>
      </div>
    </div>
  );
};

export default ScrollProgress;
