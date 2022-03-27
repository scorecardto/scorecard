import React, { useEffect, useState } from 'react';

type IGpaRingProps = {
  gpa: number;
  weighted: boolean;
};

export default function GpaRing({ gpa, weighted }: IGpaRingProps) {
  const [pct, setPct] = useState(1);

  useEffect(() => {
    setPct(1 - (gpa - 1) / (weighted ? 4.0 : 3.0));
  }, [gpa, weighted]);

  return (
    <svg height="30" width="30" viewBox="0 0 60 60">
      <circle
        cx="30"
        cy="30"
        r="20"
        fill="none"
        className="stroke-theme-100"
        strokeWidth="10"
        strokeMiterlimit={1}
      />
      <circle
        cx="30"
        cy="30"
        r="20"
        fill="none"
        className="stroke-theme-200 transition-all duration-1000"
        strokeWidth="10"
        strokeDasharray={125.6636}
        strokeDashoffset={pct * 125.6636 + 7}
        strokeMiterlimit={1}
        strokeLinecap="round"
      />
      Sorry, your browser does not support inline SVG.
    </svg>
  );
}
